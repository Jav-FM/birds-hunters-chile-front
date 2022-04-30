import React, { useState, useEffect } from "react";
import "./MyCapturesDetail.scss";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { CustomAlert } from "../../../components/Common/CustomAlert";
import { useSelector, useDispatch } from "react-redux";
import { loadingActions } from "../../../store/loading";
import { userPhotosActions } from "../../../store/userPhotos";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { IoSearchCircleSharp } from "react-icons/io5";
import PhotosService from "../../../request/services/PhotosService";
import moment from "moment";

const MyCapturesDetail = () => {
  const loading = useSelector((state) => state.loading.loading);
  const userPhotos = useSelector((state) => state.userPhotos.userPhotos);
  const { userData } = useSelector((state) => state.login);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bird, setBird] = useState(null);
  const [alertContent, setAlertContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);
  const handleShowConfirmationModal = () => setShowConfirmationModal(true);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  //Traigo los datos del ave desde las fotos del usuario guardadas en redux
  useEffect(() => {
    const thisBird = userPhotos.filter((photo) => photo.id === Number(id));
    if (thisBird.length > 0) setBird(thisBird[0]);
  }, [id, userPhotos]);

  //Función para eliminar captura
  const handleDelete = async () => {
    handleCloseDeleteModal();
    dispatch(loadingActions.setLoading(true));
    try {
      const createPhotoResponse = await PhotosService.deletePhoto(bird.id);
      if (createPhotoResponse.data.ok) {
        const getPhotosResponse = await PhotosService.getPhotoByUser(
          userData.id
        );
        const { data } = await getPhotosResponse.data;
        dispatch(userPhotosActions.setUserPhotos(data));
        dispatch(loadingActions.setLoading(false));
        handleShowConfirmationModal();
      }
    } catch (e) {
      dispatch(loadingActions.setLoading(false));
      if (!e.data) {
        setAlertContent("No se pudo establecer conexión con el servidor.");
      } else {
        setAlertContent(e.data.error);
      }
      setTimeout(() => {
        setAlertContent("");
      }, 5000);
    }
  };

  //Función ejecutada al aceptar el éxito de la captura en el modal
  const handleExitOnDelete = () => {
    handleCloseConfirmationModal();
    navigate("/mycaptures");
  };

  return (
    <React.Fragment>
      {loading ? (
        <LoadingScreen />
      ) : !loading && !bird ? (
        <div
          id="mycapturesdetail"
          className="d-flex flex-column align-items-center"
        >
          <h3 className="my-5">La captura buscada no está en tus registros.</h3>
        </div>
      ) : (
        <div
          id="mycapturesdetail"
          className="d-flex flex-column align-items-center"
        >
          {alertContent !== "" && (
            <CustomAlert variant="danger" className="mt-2 mb-0">
              {alertContent}
            </CustomAlert>
          )}

          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Estás seguro/a de que quieres eliminar esta captura?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleDelete}>
                Sí, eliminar
              </Button>
              <Button variant="danger" onClick={handleCloseDeleteModal}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showConfirmationModal}
            onHide={handleCloseConfirmationModal}
          >
            <Modal.Body>Captura eliminada con éxito</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleExitOnDelete}>
                Aceptar
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showPhotoModal}
            fullscreen={true}
            onHide={() => setShowPhotoModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Tu captura de {bird.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
              <img
                src={bird.photo}
                alt={bird.name}
              />
            </Modal.Body>
          </Modal>

          <div className="container d-flex mt-5 mb-2 align-items-center justify-content-between px-4">
            <div
              id="mycapturesdetail-header"
              className="d-flex  align-items-center gap-2"
            >
              <h1 id="icon">
                <BsArrowLeftCircleFill onClick={() => navigate(-1)} />
              </h1>
              <h2>{bird.name}</h2>
            </div>
            <Button
              id="see-avepedia-button"
              onClick={() => navigate(`/avepedia/${bird.bird_id}`)}
            >
              Ver en Avepedia
            </Button>
          </div>
          <div className="container d-flex flex-wrap justify-content-evenly align-items-center gap-5 mt-4 mb-5">
            <div
              id="photo-container"
              className=" d-flex  justify-content-center align-items-start mt-5"
            >
              <img
                src={bird.photo}
                alt={bird.name}
                style={{
                  maxWidth: "450px",
                  height: "auto",
                  borderRadius: "20px",
                }}
              />
              <h1 id="see-image-icon">
                <IoSearchCircleSharp onClick={() => setShowPhotoModal(true)} />
              </h1>
            </div>
            <div id="info" className="wrap-reverse">
              <p>
                <b>Fecha de captura:</b>{" "}
                {moment(bird.date).format("DD/MM/YYYY")}
              </p>
              <p>
                <b>Lugar de avistamiento:</b> {bird.place}
              </p>
              <p>
                <b>Orden taxonomico:</b> {bird.order}
              </p>
              <div id="buttons-container" className="d-flex gap-3">
                <Button
                  className="photo-button"
                  variant="secondary"
                  onClick={() =>
                    navigate(`/editcapture/${bird.bird_id}/${bird.id}`)
                  }
                >
                  Reemplazar
                </Button>
                <Button
                  className="photo-button"
                  variant="secondary"
                  onClick={handleShowDeleteModal}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export { MyCapturesDetail };
