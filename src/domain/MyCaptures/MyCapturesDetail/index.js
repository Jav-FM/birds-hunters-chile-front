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
  const [disabledButton, setDisabledButton] = useState(true);
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
        // <div
        //   id="mycapturesdetail"
        //   className="d-flex flex-column align-items-center"
        // >
        //   <h2 className="mt-5">Mi captura de:</h2>
        //   <h1 className="mb-5">{bird.name}</h1>
        // </div>
        <div
          id="mycapturesdetail"
          className="d-flex flex-column justify-content-center align-items-between mb-4"
        >
          <div
            id="mycapturesdetail"
            className="container d-flex mt-5 mb-2 align-items-center gap-2"
          >
            <h1 id="icon">
              <BsArrowLeftCircleFill onClick={() => navigate("/mycaptures")} />
            </h1>
            <h2>{bird.name}</h2>
          </div>

          <div className="container d-flex flex-wrap justify-content-evenly gap-5">
            <div
              id="photo-container"
              className=" d-flex align-items-center justify-content-center"
            >
              <img
                id="photo"
                src={`http://localhost:8080/birdsphotos/${bird.photo}`}
                alt={bird.name}
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
                <Button>Cambiar foto</Button>
                <Button onClick={() => navigate(`/avepedia/${bird.bird_id}`)}>
                  Ver en Avepedia
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
