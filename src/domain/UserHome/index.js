import React, { useEffect } from "react";
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
        <div id="home">
          <HomeHeader />

          <div id="home-photos" className="container mt-4 mb-5">
            <h3>¡Hola {userData.names}!</h3>
            <h4>Este es el estado actual de tus capturas:</h4>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export { UserHome };
