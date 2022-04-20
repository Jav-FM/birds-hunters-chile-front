import React, { useEffect } from "react";
import { HomeHeader } from "../../components/HomeHeader";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { birdsActions } from "../../store/birds";
import { loadingActions } from "../../store/loading";

const Home = () => {
  const birds = useSelector((state) => state.birds.birds);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (birds.length === 0) {
      dispatch(loadingActions.setLoading(true));
      fetch("https://aves.ninjas.cl/api/birds")
        .then((response) => response.json())
        .then((json) => {
          const orderedBirds = json.sort((a, b) => a.name.spanish.localeCompare(b.name.spanish));
          dispatch(birdsActions.setBirds(orderedBirds));
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
          <div
            id="home-photos"
            className="container-fluid d-flex flex-wrap justify-content-center"
          >
            {birds.slice(47, 77).map((b, i) => {
              return <img key={i} src={b.images?.main} alt={b.name?.spanish} />;
            })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export { Home };
