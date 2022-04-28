import React, { useState, useEffect } from "react";
import { HomeHeader } from "../../components/HomeHeader";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { birdsActions } from "../../store/birds";
import { loadingActions } from "../../store/loading";

const Home = () => {
  const birds = useSelector((state) => state.birds.birds);
  const loading = useSelector((state) => state.loading.loading);
  const [randomNumber, setRandomNumber] = useState(47);
  const dispatch = useDispatch();

  //Si no tengo aves en redux, las traigo desde API y las ordeno alfabeticamente
  //Genero un numero random para el despliegue de fotos en el home
  useEffect(() => {
    const randomNumber = (min, max) => {
      const r = Math.random() * (max - min) + min;
      return Math.floor(r);
    };
    const thisRandomNumber = randomNumber(1, 200);
    setRandomNumber(thisRandomNumber);
    if (birds.length === 0) {
      console.log("aqui");
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
    } else {
      dispatch(loadingActions.setLoading(false));
    }
  }, [loading]);

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
            {birds.slice(randomNumber, randomNumber + 30).map((b, i) => {
              return <img key={i} src={b.images?.main} alt={b.name?.spanish} />;
            })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export { Home };
