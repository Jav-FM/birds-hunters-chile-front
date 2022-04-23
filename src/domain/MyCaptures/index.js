import React, { useState, useEffect } from "react";
import { LoadingScreen } from "../../components/LoadingScreen";
import { CapturesGallery } from "../../components/CapturesGallery";
import { useSelector, useDispatch } from "react-redux";
import { birdsActions } from "../../store/birds";
import { loadingActions } from "../../store/loading";
import { Alert, Button } from "react-bootstrap";
import PhotosService from "../../request/services/PhotosService";
import { userPhotosActions } from "../../store/userPhotos";
import { useNavigate } from "react-router-dom";

const MyCaptures = () => {
  const userPhotos = useSelector((state) => state.userPhotos.userPhotos);
  const { userData } = useSelector((state) => state.login);
  const [alertContent, setAlertContent] = useState("");
  const loading = useSelector((state) => state.loading.loading);
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

  return (
    <React.Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div id="mycaptures" className="d-flex flex-column align-items-center">
          {alertContent !== "" && (
            <Alert variant="danger" className="mt-2 mb-0">
              {alertContent}
            </Alert>
          )}
          <h1 className="my-5">Mis capturas</h1>
          {userPhotos.length !== 0 ? (
            <CapturesGallery />
          ) : (
            <React.Fragment>
              <h4 className="mt-4 mb-4">Aún no tienes capturas registradas</h4>
              <Button onClick={() => navigate('/newcapture')}>Registrar nueva captura</Button>
            </React.Fragment>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export { MyCaptures };
