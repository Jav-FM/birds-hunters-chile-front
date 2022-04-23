import React, { useState, useEffect } from "react";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { loadingActions } from "../../store/loading";
import { birdsActions } from "../../store/birds";
import { Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PhotosService from "../../request/services/PhotosService";
import { userPhotosActions } from "../../store/userPhotos";
import { CaptureForm } from "../../components/CaptureForm";

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
  const [place, setPlace] = useState("");
  const [file, setFile] = useState("");
  const [src, setSrc] = useState("");
  const { userData } = useSelector((state) => state.login);
  const [birdName, setBirdName] = useState("");
  const [birdOrder, setBirdOrder] = useState("");
  const [alertContent, setAlertContent] = useState("");

  useEffect(() => {
    setSelectedSpecies(params.bird_id ? params.bird_id : "");
    setDate("");
    setPlace("");
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
  }, []);

  const handleSelectBird = (e) => {
    console.log(e.target.value);
    setSelectedSpecies(e.target.value);
    fetch(`https://aves.ninjas.cl/api/birds/${e.target.value}`)
      .then((response) => response.json())
      .then((json) => {
        setBirdOrder(json.order);
        setBirdName(json.name.spanish);
      });
  };

  const handleSetFile = (e) => {
    setFile(e.target.value);
    setSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("user_id", userData.id);
    form.append("order", birdOrder);
    form.append("name", birdName);
    console.log(Object.fromEntries(form));
    // fetch("tu-ruta", {method:¨:¨post, body:¨form})

    try {
      const createPhotoResponse = await PhotosService.createPhoto(form);
      if (createPhotoResponse.data.ok) {
        const getPhotosResponse = await PhotosService.getPhotoByUser(
          userData.id
        );
        const { data } = await getPhotosResponse.data;
        dispatch(userPhotosActions.setUserPhotos(data));
        navigate("/mycaptures");
      }
    } catch (e) {
      if (!e.data.error) {
        setAlertContent("No se pudo establecer conexión con el servidor.");
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
            <Alert variant="danger" className="mt-2 mb-0">
              {alertContent}
            </Alert>
          )}

          <div
            id="newcapture"
            className="d-flex flex-column align-items-center"
          >
            <h1 className="my-5">Nueva captura</h1>

            <CaptureForm
              src={src}
              handleRegister={handleRegister}
              selectedSpecies={selectedSpecies}
              handleSelectBird={handleSelectBird}
              date={date}
              setDate={setDate}
              place={place}
              setPlace={setPlace}
              file={file}
              handleSetFile={handleSetFile}
              buttonText={"Registrar"}
            />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export { NewCapture };
