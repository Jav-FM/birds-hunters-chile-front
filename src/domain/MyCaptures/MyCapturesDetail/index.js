import React, { useState, useEffect } from "react";
import "./MyCapturesDetail.scss";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { loadingActions } from "../../../store/loading";
import { birdsActions } from "../../../store/birds";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";

const MyCapturesDetail = () => {
  const loading = useSelector((state) => state.loading.loading);
  const { id } = useParams();
  const navigate = useNavigate();
  const userPhotos = useSelector((state) => state.userPhotos.userPhotos);
  const [bird, setBird] = useState(null);

  useEffect(() => {
    const thisBird = userPhotos.filter((photo) => photo.id === Number(id));
    if (thisBird.length > 0) setBird(thisBird[0]);
  }, [id, userPhotos]);

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
          <div className="container d-flex mt-5 mb-2 align-items-center justify-content-between px-4" >
            <div
              id="mycapturesdetail-header"
              className="d-flex  align-items-center gap-2"
            >
              <h1 id="icon">
                <BsArrowLeftCircleFill onClick={() => navigate(-1)} />
              </h1>
              <h2>{bird.name}</h2>
            </div>
            <Button id="see-avepedia-button" onClick={() => navigate(`/avepedia/${bird.bird_id}`)}>
              Ver en Avepedia
            </Button>
          </div>
          <div className="container d-flex flex-wrap justify-content-evenly align-items-center gap-5 mt-4 mb-5">
            <div
              id="photo-container"
              className=" d-flex align-items-center justify-content-center"
            >
              <img
                src={`http://localhost:8080/birdsphotos/${bird.photo}`}
                alt={bird.name}
                style={{ maxHeight: "450px", maxWidth: "450px" }}
              />
            </div>
            <div id="info" className="wrap-reverse">
              <p>
                <b>Fecha de captura:</b> {bird.date}
              </p>
              <p>
                <b>Lugar de avistamiento:</b> {bird.place}
              </p>
              <p>
                <b>Orden taxonomico:</b> {bird.order}
              </p>
              <div id="buttons-container" className="d-flex gap-3">
                <Button className="photo-button" variant="secondary" onClick={() => navigate(`/editcapture/${bird.bird_id}/${bird.id}`)}>
                  Reemplazar
                </Button>
                <Button className="photo-button" variant="secondary" onClick={() => {}}>
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
