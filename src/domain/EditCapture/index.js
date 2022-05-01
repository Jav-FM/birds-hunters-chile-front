import React, { useState, useEffect } from "react";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { loadingActions } from "../../store/loading";
import { CustomAlert } from "../../components/Common/CustomAlert";
import { birdsActions } from "../../store/birds";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PhotosService from "../../request/services/PhotosService";
import { userPhotosActions } from "../../store/userPhotos";
import { CaptureForm } from "../../components/CaptureForm";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import moment from "moment";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { imagesStorage } from "../../firebase-config";

const EditCapture = () => {
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

  //Se limpian campos, se trae especie al input correspondiente y se traen datos de API para campos orden y nombre
  useEffect(() => {
    setSelectedSpecies(params.bird_id);
    setDate("");
    setPlace("");
    setFile("");
    setSrc("");
    setBirdName("");
    setBirdOrder("");
    fetch(`https://aves.ninjas.cl/api/birds/${params.bird_id}`)
      .then((response) => response.json())
      .then((json) => {
        setBirdOrder(json.order);
        setBirdName(json.name.spanish);
      });
  }, []);

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

  //Función que ejecuta el registro de los cambios.
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
            form.append("bird_id", params.bird_id);
            form.append("user_id", userData.id);
            form.append("order", birdOrder);
            form.append("name", birdName);
            form.append("photo", url);
            const createPhotoResponse = await PhotosService.replacePhoto(
              params.capture_id,
              form
            );
            if (createPhotoResponse.data.ok) {
              const getPhotosResponse = await PhotosService.getPhotoByUser(
                userData.id
              );
              const { data } = await getPhotosResponse.data;
              const orderedUserPhotos = data.sort((a, b) =>
                a.name.localeCompare(b.name)
              );
              dispatch(userPhotosActions.setUserPhotos(orderedUserPhotos));
              navigate("/mycaptures");
            }
          });
        }
      );
    } catch (e) {
      dispatch(loadingActions.setLoading(false));
      if (!e.data) {
        setAlertContent(e);
      } else {
        setAlertContent(e.data.error);
      }
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
            <CustomAlert variant="danger" className="mt-2 mb-0">
              {alertContent}
            </CustomAlert>
          )}

          <div
            id="editcapture"
            className="d-flex flex-column align-items-center"
          >
            <div className="container d-flex mt-5 mb-2 align-items-center  px-5">
              <h1 id="icon">
                <BsArrowLeftCircleFill
                  onClick={() => navigate(-1)}
                  style={{
                    color: "#8bc34a",
                    paddingBottom: "5px",
                    marginRight: 10,
                  }}
                />
              </h1>
              <h2>
                Reemplazar captura de:{" "}
                <span style={{ color: "#8bc34a" }}>{birdName}</span>
              </h2>
            </div>

            <CaptureForm
              src={src}
              handleRegister={handleRegister}
              selectedSpecies={selectedSpecies}
              date={date}
              setDate={setDate}
              dateError={dateError}
              place={place}
              setPlace={setPlace}
              fileValue={fileValue}
              fileError={fileError}
              handleSetFile={handleSetFile}
              buttonText={"Reemplazar"}
              editMode={true}
            />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export { EditCapture };
