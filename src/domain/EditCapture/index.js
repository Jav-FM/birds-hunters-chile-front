import React, { useState, useEffect } from "react";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { loadingActions } from "../../store/loading";
import { birdsActions } from "../../store/birds";
import { Alert, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PhotosService from "../../request/services/PhotosService";
import { userPhotosActions } from "../../store/userPhotos";
import { CaptureForm } from "../../components/CaptureForm";

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
  const [place, setPlace] = useState("");
  const [file, setFile] = useState("");
  const [src, setSrc] = useState("");
  const { userData } = useSelector((state) => state.login);
  const [birdName, setBirdName] = useState("");
  const [birdOrder, setBirdOrder] = useState("");
  const [alertContent, setAlertContent] = useState("");

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

  const handleSetFile = (e) => {
    setFile(e.target.value);
    setSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("bird_id", params.bird_id)
    form.append("user_id", userData.id);
    form.append("order", birdOrder);
    form.append("name", birdName);
    console.log(Object.fromEntries(form));


    try {
      const createPhotoResponse = await PhotosService.replacePhoto(params.capture_id,form);
      if (createPhotoResponse.data.ok) {
        const getPhotosResponse = await PhotosService.getPhotoByUser(
          userData.id
        );
        const { data } = await getPhotosResponse.data;
        dispatch(userPhotosActions.setUserPhotos(data));
        navigate("/mycaptures");
      }
    } catch (e) {
      dispatch(loadingActions.setLoading(false));
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
            id="editcapture"
            className="d-flex flex-column align-items-center"
          >
            <div className="container d-flex mt-5 mb-2 align-items-center justify-content-between px-5">
              <h2>
                Reemplazar captura de:{" "}
                <span style={{ color: "#8bc34a" }}>{birdName}</span>
              </h2>

              <Button id="see-avepedia-button" onClick={() => navigate(-1)}>
                Cancelar
              </Button>
            </div>

            <CaptureForm
              src={src}
              handleRegister={handleRegister}
              selectedSpecies={selectedSpecies}
              date={date}
              setDate={setDate}
              place={place}
              setPlace={setPlace}
              file={file}
              handleSetFile={handleSetFile}
              buttonText={"Reemplazar"}
            />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export { EditCapture };
