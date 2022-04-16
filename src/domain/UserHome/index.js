import React, { useEffect } from "react";
import { HomeHeader } from "../../components/HomeHeader";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { birdsActions } from "../../store/birds";
import { loadingActions } from "../../store/loading";

const UserHome = () => {
  const birds = useSelector((state) => state.birds.birds);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (birds.length === 0) {
      dispatch(loadingActions.setLoading(true));
      fetch("https://aves.ninjas.cl/api/birds")
        .then((response) => response.json())
        .then((json) => {
          dispatch(birdsActions.setBirds(json));
          dispatch(loadingActions.setLoading(false));
        });
    }
    dispatch(loadingActions.setLoading(false));
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div id="home">
          <HomeHeader />
          <h2>entraste!!</h2>
          <div
            id="home-photos"
            className="container-fluid d-flex flex-wrap justify-content-center"
          >
            {birds.slice(7, 37).map((b, i) => {
              return <img key={i} src={b.images?.main} alt={b.name?.spanish} />;
            })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export { UserHome };
