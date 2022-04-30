import React, { useEffect } from "react";
import { LoadingScreen } from "../../components/LoadingScreen";
import { BirdsGallery } from "../../components/BirdsGallery";
import { useSelector, useDispatch } from "react-redux";
import { birdsActions } from "../../store/birds";
import { loadingActions } from "../../store/loading";
import { Spinner } from "react-bootstrap";

const Avepedia = () => {
  const birds = useSelector((state) => state.birds.birds);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  //Si aves no estan guardadas en redux, se consulta API
  useEffect(() => {
    if (birds.length === 0) {
      dispatch(loadingActions.setLoading(true));
      fetch("https://aves.ninjas.cl/api/birds")
        .then((response) => response.json())
        .then((json) => {
          const orderedBirds = json.sort((a, b) =>
            a.name.spanish.localeCompare(b.name.spanish)
          );
          dispatch(birdsActions.setBirds(orderedBirds));
          dispatch(loadingActions.setLoading(false));
        });
    }
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div id="avepedia" className="d-flex flex-column align-items-center">
          <div
            className="container-fluid d-flex flex-column justify-content-center align-items-center"
            style={{
              height: "160px",
              overflow: "hidden",
              backgroundColor: "#8BC34A66",
            }}
          >
            <h1>Avepedia</h1>
            <h5>Aves nativas de Chile</h5>
          </div>

          {birds.length !== 0 ? (
            <BirdsGallery birds={birds} />
          ) : (
            <Spinner animation="border" className="spinner mt-5" />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export { Avepedia };
