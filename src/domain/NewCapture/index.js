import React, { useState, useEffect } from "react";
import { LoadingScreen } from "../../components/LoadingScreen";
import { CustomAlert } from "../../components/Common/CustomAlert";
import { useSelector, useDispatch } from "react-redux";
import { loadingActions } from "../../store/loading";
import { birdsActions } from "../../store/birds";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderWithPhotos } from "../../components/HeaderWithPhotos";
import PhotosService from "../../request/services/PhotosService";
import { userPhotosActions } from "../../store/userPhotos";
import { CaptureForm } from "../../components/CaptureForm";
import moment from "moment";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { imagesStorage } from "../../firebase-config";

const NewCapture = () => {
  const birds = useSelector((state) => state.birds.birds);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [selectedSpecies, setSelectedSpecies] = useState(
    params.bird_id ? params.bird_id : ""
  );
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [place, setPlace] = useState("");
  const [file, setFile] = useState("");
  const [fileValue, setFileValue] = useState("");
  const [fileError, setFileError] = useState("");
  const [src, setSrc] = useState("");
  const { userData } = useSelector((state) => state.login);
  const [birdName, setBirdName] = useState("");
  const [birdOrder, setBirdOrder] = useState("");
  const [alertContent, setAlertContent] = useState("");

  //Vacío los campos y, de existir, coloco la especie en el selector correspondiente
  useEffect(() => {
    dispatch(loadingActions.setLoading(true));
    setSelectedSpecies(params.bird_id ? params.bird_id : "");
    setDate("");
    setPlace("");
    setFileValue("");
    setFile("");
    setSrc("");
    setBirdName("");
    setBirdOrder("");
    if (birds.length === 0) {
      dispatch(loadingActions.setLoading(true));
      fetch("https://aves.ninjas.cl/api/birds")
        .then((response) => response.json())
        .then((json) => {
          const orderedBirds = json.sort((a, b) =>
            a.name.spanish.localeCompare(b.name.spanish)
          );
          dispatch(birdsActions.setBirds(orderedBirds));
          dispatch(loadingActions.setLoading(false));
        });
    }
    if (params.bird_id) {
      fetch(`https://aves.ninjas.cl/api/birds/${params.bird_id}`)
        .then((response) => response.json())
        .then((json) => {
          setBirdOrder(json.order);
          setBirdName(json.name.spanish);
        });
    }
    dispatch(loadingActions.setLoading(false));
  }, []);

  //Manejo de selección de especie
  const handleSelectBird = (e) => {
    setSelectedSpecies(e.target.value);
    fetch(`https://aves.ninjas.cl/api/birds/${e.target.value}`)
      .then((response) => response.json())
      .then((json) => {
        setBirdOrder(json.order);
        setBirdName(json.name.spanish);
      });
  };

  //Validador para fecha de captura
  const validateDate = (e) => {
    const today = moment(new Date()).format("YYYY-MM-DD");
    const selectedDay = moment(e);
    if (selectedDay.diff(moment(today), "days") > 0) {
      return false;
    } else {
      return true;
    }
  };

  //Ejecución de validadores
  useEffect(() => {
    if (date !== "") {
      validateDate(date)
        ? setDateError("")
        : setDateError("La fecha no puede ser posterior al día de hoy.");
    } else {
      setDateError("");
    }
  }, [date]);

  //Manejo de selección de archivos, previsualización y obtención de URL
  const handleSetFile = (e) => {
    const selectedFile = e.target.files[0];
    const selectedFileValue = e.target.value;
    const types = ["image/png", "image/jpeg"];
    if (selectedFile) {
      // setFile(e.target.value);
      setFile(selectedFile);
      setFileValue(selectedFileValue);
      if (types.includes(selectedFile.type)) {
        setSrc(URL.createObjectURL(selectedFile));
        setFileError("");
      } else {
        setSrc("");
        setFileError("La imagen debe ser formato .png, .jpg o .jpeg.");
      }
    }
  };

  //Función que ejecuta el registro de la nueva captura
  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(loadingActions.setLoading(true));
    const imageName = `${selectedSpecies}-${userData.id}-${file.name}`;
    const storageRef = ref(imagesStorage, `/files/${imageName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    try {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          throw new Error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            const form = new FormData(e.target);
            form.append("user_id", userData.id);
            form.append("order", birdOrder);
            form.append("name", birdName);
            form.append("photo", url);
            const createPhotoResponse = await PhotosService.createPhoto(form);
            if (createPhotoResponse.data.ok) {
              const getPhotosResponse = await PhotosService.getPhotoByUser(
                userData.id
              );
              const { data } = await getPhotosResponse.data;

              dispatch(userPhotosActions.setUserPhotos(data));

              navigate("/mycaptures");
            }
          });
        }
      );
    } catch (e) {
      setFileValue("");
      setFile("");
      setSrc("");
      if (!e.data) {
        setAlertContent(e);
      } else {
        setAlertContent(e.data.error);
      }
      dispatch(loadingActions.setLoading(false));
      setTimeout(() => {
        setAlertContent("");
      }, 5000);
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <React.Fragment>
          {alertContent !== "" && (
            <CustomAlert
              variant="danger"
              className="mt-2 mb-0 mx-auto"
              style={{ width: "80%" }}
            >
              {alertContent}
            </CustomAlert>
          )}

          <div
            id="newcapture"
            className="d-flex flex-column align-items-center"
          >
            <HeaderWithPhotos title="Nueva captura" />
            <div className="container my-5">
              <CaptureForm
                src={src}
                handleRegister={handleRegister}
                selectedSpecies={selectedSpecies}
                handleSelectBird={handleSelectBird}
                date={date}
                setDate={setDate}
                dateError={dateError}
                place={place}
                setPlace={setPlace}
                fileValue={fileValue}
                fileError={fileError}
                handleSetFile={handleSetFile}
                buttonText={"Registrar"}
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export { NewCapture };
