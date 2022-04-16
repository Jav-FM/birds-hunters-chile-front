import React, { useState, useEffect } from "react";
import "./AvepediaDetail.scss";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BirdsGallery } from "../../../components/BirdsGallery";
import { useSelector, useDispatch } from "react-redux";
import { birdsActions } from "../../../store/birds";
import { loadingActions } from "../../../store/loading";
import { Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";

const AvepediaDetail = ({ navigation }) => {
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
          <div
            id="avepedia-detail-header"
            className="container d-flex mt-5 align-items-center gap-2"
          >
            <h1 id="icon">
              <BsArrowLeftCircleFill onClick={() => navigate("/avepedia")} />
            </h1>
            <h2>{bird.name.spanish}</h2>
          </div>

          <div className="container d-flex flex-wrap justify-content-evenly align-items-start gap-5">
            <div id="info" className="wrap-reverse">
              <img
                id="photo"
                src={bird.images.gallery[0].url}
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
