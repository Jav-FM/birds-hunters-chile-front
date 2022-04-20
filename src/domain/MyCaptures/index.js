import React, { useEffect } from "react";
import { LoadingScreen } from "../../components/LoadingScreen";
import { CapturesGallery } from "../../components/CapturesGallery";
import { useSelector, useDispatch } from "react-redux";
import { birdsActions } from "../../store/birds";
import { loadingActions } from "../../store/loading";
import { Spinner } from "react-bootstrap";

const MyCaptures = () => {
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
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div id="mycaptures" className="d-flex flex-column align-items-center">
          <h1 className="my-5">Mis capturas</h1>
          {birds.length !== 0 ? (
            <CapturesGallery birds={birds} />
          ) : (
            <Spinner animation="border" className="spinner mt-5" />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export { MyCaptures };
