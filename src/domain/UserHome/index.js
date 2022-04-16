import React, { useEffect } from "react";
import "./UserHome.scss";
import { HomeHeader } from "../../components/HomeHeader";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { birdsActions } from "../../store/birds";
import { loadingActions } from "../../store/loading";

const UserHome = () => {
  const birds = useSelector((state) => state.birds.birds);
  const loading = useSelector((state) => state.loading.loading);
  const { userData } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (birds.length === 0) {
    //   dispatch(loadingActions.setLoading(true));
    //   fetch("https://aves.ninjas.cl/api/birds")
    //     .then((response) => response.json())
    //     .then((json) => {
    //       dispatch(birdsActions.setBirds(json));
    //       dispatch(loadingActions.setLoading(false));
    //     });
    // }
    dispatch(loadingActions.setLoading(false));
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div id="userhome">
          <HomeHeader />

          <div id="userhome-metrix" className="container mt-4 mb-5">
            <h3>¡Hola {userData.names}!</h3>
            <h4>Este es el estado actual de tus capturas:</h4>
            <div id="userhome-cards-container" className="d-flex flex-wrap gap-4 justify-content-evenly">
              <div className="userhome-card d-flex flex-column justify-content-center align-items-center mt-5">
                <h4>Total de aves nativas capturadas</h4>
                <h3>1/246</h3>
              </div>
              <div className="userhome-card d-flex flex-column justify-content-center align-items-center mt-5">
                <h4>Orden Taxonómico predominante</h4>
                <h3>Apodiforme</h3>
              </div>
              <div className="userhome-card d-flex flex-column justify-content-center align-items-center mt-5">
                <h4>Última captura</h4>
                <h3>Picaflor chico</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export { UserHome };
