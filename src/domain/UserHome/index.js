import React, { useState, useEffect } from "react";
import "./UserHome.scss";
import { HomeHeader } from "../../components/HomeHeader";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { userPhotosActions } from "../../store/userPhotos";
import PhotosService from "../../request/services/PhotosService";
import { loadingActions } from "../../store/loading";
import { Alert } from "react-bootstrap";
import moment from "moment";

const UserHome = () => {
  const userPhotos = useSelector((state) => state.userPhotos.userPhotos);
  const loading = useSelector((state) => state.loading.loading);
  const [alertContent, setAlertContent] = useState("");
  const [lastBirds, setLastBirds] = useState([]);
  const { userData } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserPhotos = async () => {
      try {
        console.log(userData.id);
        const response = await PhotosService.getPhotoByUser(userData.id);
        const { data } = await response.data;
        dispatch(userPhotosActions.setUserPhotos(data));
        console.log(data);
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
      const orderedByDay = userPhotos.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      // .split("")
      // .splice(0, 19)
      // .join("")
      // .toString();

      console.log(orderedByDay);
      const thisLastBirds = userPhotos.filter(
        (b) => b.date === orderedByDay[0].date
      );
      setLastBirds(thisLastBirds[0]);
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
              </div>
              <div className="userhome-card d-flex flex-column justify-content-center align-items-center mt-5">
                <h4>Orden Taxonómico predominante</h4>
                {userPhotos.length === 0 ? (
                  <h3>No aplica</h3>
                ) : (
                  <h3>pendiente</h3>
                )}
              </div>
              <div className="userhome-card d-flex flex-column justify-content-center align-items-center mt-5">
                <h4>Avistamiento más reciente</h4>
                {userPhotos.length === 0 ? (
                  <h3>No aplica</h3>
                ) : (
                  <React.Fragment>
                    {" "}
                    <h3>{lastBirds.name}</h3>
                    <h4>{moment(lastBirds.date).format("DD/MM/YYYY")}</h4>
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
