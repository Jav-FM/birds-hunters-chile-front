import React, { useState, useEffect } from "react";
import "./UserHome.scss";
import { HomeHeader } from "../../components/HomeHeader";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userPhotosActions } from "../../store/userPhotos";
import PhotosService from "../../request/services/PhotosService";
import { loadingActions } from "../../store/loading";
import { Alert, Button } from "react-bootstrap";
import moment from "moment";

const UserHome = () => {
  const userPhotos = useSelector((state) => state.userPhotos.userPhotos);
  const loading = useSelector((state) => state.loading.loading);
  const [alertContent, setAlertContent] = useState("");
  const [lastBirds, setLastBirds] = useState([]);
  const [predominantOrder, setPredominantOrder] = useState("")
  const { userData } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserPhotos = async () => {
      try {
        const response = await PhotosService.getPhotoByUser(userData.id);
        const { data } = await response.data;
        dispatch(userPhotosActions.setUserPhotos(data));
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
    if (userPhotos.length === 0) {
      dispatch(loadingActions.setLoading(true));
      getUserPhotos();
    }
    dispatch(loadingActions.setLoading(false));
  }, []);

  useEffect(() => {
    if (userPhotos.length > 0) {
      const mostResent = userPhotos.reduce((mostRecent, item) =>
        item.date > mostRecent.date ? item : mostRecent
      );
      setLastBirds(mostResent);
      const orders = userPhotos.map((p) => p.order);
      const mostRepitedOrder = orders.reduce(
        (a, b, i, arr) =>
          arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length
            ? a
            : b,
        null
      );
      setPredominantOrder(mostRepitedOrder)
    }
  }, [userPhotos]);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div id="userhome">
          {alertContent !== "" && (
            <Alert variant="danger" className="mt-2 mb-0">
              {alertContent}
            </Alert>
          )}
          <HomeHeader />

          <div id="userhome-metrix" className="container mt-4 mb-5">
            <h3>¡Hola {userData.names}!</h3>
            <h4>Este es el estado actual de tus capturas:</h4>
            <div
              id="userhome-cards-container"
              className="d-flex flex-wrap gap-4 justify-content-evenly"
            >
              <div className="userhome-card d-flex flex-column justify-content-center align-items-center mt-5">
                <h4>Total de aves nativas capturadas</h4>
                <h3>{userPhotos.length}/246</h3>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/mycaptures")}
                >
                  Mis capturas
                </Button>
              </div>
              <div className="userhome-card d-flex flex-column justify-content-center align-items-center mt-5">
                <h4>Orden Taxonómico predominante</h4>
                {userPhotos.length === 0 ? (
                  <h3>No aplica</h3>
                ) : (
                  <h3>{predominantOrder}</h3>
                )}
              </div>
              <div className="userhome-card d-flex flex-column justify-content-center align-items-center mt-5">
                <h4>Captura más reciente</h4>
                {userPhotos.length === 0 ? (
                  <h3>No aplica</h3>
                ) : (
                  <React.Fragment>
                    {" "}
                    <h3>{lastBirds.name}</h3>
                    <div className="d-flex gap-3 align-items-center">
                      <h4 className="mb-0">
                        {moment(lastBirds.date).format("DD/MM/YYYY")}
                      </h4>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          navigate(`/mycapturesdetail/${lastBirds.id}`)
                        }
                      >
                        Ver
                      </Button>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export { UserHome };
