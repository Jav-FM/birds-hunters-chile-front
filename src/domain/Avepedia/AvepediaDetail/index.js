import React, { useState, useEffect } from "react";
import "./AvepediaDetail.scss";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BirdsGallery } from "../../../components/BirdsGallery";
import { useSelector, useDispatch } from "react-redux";
import { birdsActions } from "../../../store/birds";
import { loadingActions } from "../../../store/loading";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { FiCameraOff } from "react-icons/fi";

const AvepediaDetail = () => {
  const { loginState } = useSelector((state) => state.login);
  const userPhotos = useSelector((state) => state.userPhotos.userPhotos);
  const navigate = useNavigate();
  const { id } = useParams();
  const [bird, setBird] = useState(null);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingActions.setLoading(true));
    fetch(`https://aves.ninjas.cl/api/birds/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setBird(json);
        dispatch(loadingActions.setLoading(false));
      });
  }, [id, dispatch]);

  return (
    <React.Fragment>
      {!loading && bird ? (
        <div
          id="avepedia-detail"
          className="d-flex flex-column justify-content-center align-items-between"
        >
          {loginState ? (
            <div
              id="avepedia-detail-header"
              className="container d-flex mt-5 align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center gap-2">
                <h1 id="icon">
                  <BsArrowLeftCircleFill
                    onClick={() => navigate(-1)}
                  />
                </h1>
                <h2>{bird.name.spanish}</h2>
              </div>
              {userPhotos.filter((p) => p.bird_id === id).length > 0 ? (
                <div className="d-flex align-items-center gap-2">
                  <h4>Capturada</h4>
                  <h3>
                    <FaCamera style={{color: '#5a9216'}}/>
                  </h3>
                  <Button
                    className="mx-2"
                    onClick={() =>
                      navigate(
                        `/mycapturesdetail/${
                          userPhotos.filter((p) => p.bird_id === id)[0].id
                        }`
                      )
                    }
                  >
                    Ver captura
                  </Button>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-2">
                  <h4>No capturada</h4>
                  <h3>
                    <FiCameraOff style={{color: '#5a9216'}}/>
                  </h3>
                  <Button
                    className="mx-2"
                    onClick={() => navigate(`/newcapture/${id}`)}
                  >
                    Registrar captura
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div
              id="avepedia-detail-header"
              className="container d-flex mt-5 align-items-center gap-2"
            >
              <h1 id="icon">
                <BsArrowLeftCircleFill onClick={() => navigate("/avepedia")} />
              </h1>
              <h2>{bird.name.spanish}</h2>
            </div>
          )}

          <div className="container d-flex flex-wrap justify-content-evenly align-items-start gap-5">
            <div id="info" className="wrap-reverse">
              <img
                id="photo"
                src={
                  bird.images.gallery.length > 0
                    ? bird.images.gallery[0]?.url
                    : bird.images.main
                }
                alt={bird.name.spanish}
                className="mb-5"
              />
              <p>
                <b>Nombre en latín:</b> {bird.name.latin}
              </p>
              <p>
                <b>Dónde encontrarlo:</b> {bird.map.title}
              </p>
              <p>
                <b>Información:</b> {bird.iucn.description}
              </p>
              <p>{bird.didyouknow}</p>
              <p>
                <b>Hábitat:</b> {bird.habitat}
              </p>
              <p>
                <b>Tamaño:</b> {bird.size}
              </p>
            </div>
            <img id="map" src={bird.map.image} alt="mapaChile" />
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </React.Fragment>
  );
};

export { AvepediaDetail };
