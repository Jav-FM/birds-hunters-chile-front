import React, { useState, useEffect } from "react";
import "./NewCapture.scss";
import { LoadingScreen } from "../../components/LoadingScreen";
import { CustomInput } from "../../components/Common/CustomInput";
import { useSelector, useDispatch } from "react-redux";
import { loadingActions } from "../../store/loading";
import { birdsActions } from "../../store/birds";
import { GiEgyptianBird } from "react-icons/gi";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PhotosService from "../../request/services/PhotosService";
import { userPhotosActions } from "../../store/userPhotos";

const NewCapture = () => {
  const [disabledButton, setDisabledButton] = useState(true);
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
    setSelectedSpecies("");
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
  }, []);

  useEffect(() => {
    if (selectedSpecies !== "" && date !== "" && place !== "" && file !== "") {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [selectedSpecies, date, place, file]);

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
     console.log(Object.fromEntries(form))
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
            id="newcapture"
            className="d-flex flex-column align-items-center"
          >
            <h1 className="my-5">Nueva captura</h1>

            <div className="container d-flex gap-5 flex-wrap align-items-center justify-content-evenly my-3">
              {src === "" ? (
                <div
                  id="waiting-picture"
                  className="d-flex align-items-center px-5"
                >
                  <h1 id="waiting-picture-icon">
                    <GiEgyptianBird />
                  </h1>
                </div>
              ) : (
                <div
                  id="upload-picture-container"
                  className="d-flex align-items-center px-5"
                >
                  <img id="upload-picture" src={src} alt="fotoseleccionada" />
                </div>
              )}

              <Form
                id="picture-form"
                className="d-flex flex-column justify-content-center"
                onSubmit={handleRegister}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Especie</Form.Label>
                  <Form.Control
                    name="bird_id"
                    required
                    as="select"
                    value={selectedSpecies}
                    onChange={handleSelectBird}
                  >
                    <option key={0} value={""}>
                      Seleccionar
                    </option>
                    {birds.map((b, i) => (
                      <option key={i + 1} value={b.uid}>
                        {b.name.spanish}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Fecha de captura</Form.Label>
                  <CustomInput
                    name="date"
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Lugar de avistamiento</Form.Label>
                  <CustomInput
                    name="place"
                    type="text"
                    required
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    name="photo"
                    type="file"
                    value={file}
                    onChange={handleSetFile}
                  />
                </Form.Group>

                <Button
                  variant="primary mt-4"
                  type="submit"
                  disabled={disabledButton}
                >
                  Registrar
                </Button>
              </Form>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export { NewCapture };
