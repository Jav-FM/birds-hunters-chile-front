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
          const orderedBirds = json.sort((a, b) => a.name.spanish.localeCompare(b.name.spanish));
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
          <h1 className="mt-5">Avepedia</h1>
          <h5 className="mb-5">Aves nativas de Chile</h5>
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
