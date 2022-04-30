import React, {useState, useEffect} from "react";
import { loadingActions } from "../../store/loading";
import { birdsActions } from "../../store/birds";
import { useDispatch, useSelector } from "react-redux";

const HeaderWithPhotos = ({title}) => {
    const dispatch = useDispatch();
    const birds = useSelector((state) => state.birds.birds);
    const [randomNumber, setRandomNumber] = useState(47);

    useEffect(() => {
        dispatch(loadingActions.setLoading(true));
        const randomNumber = (min, max) => {
          const r = Math.random() * (max - min) + min;
          return Math.floor(r);
        };
        const thisRandomNumber = randomNumber(1, 210);
        setRandomNumber(thisRandomNumber);
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
        } else {
          dispatch(loadingActions.setLoading(false));
        }
      }, []); // eslint-disable-line

  return (
    <div>
            <div
        id="home-photos"
        className="container-fluid d-flex flex-wrap justify-content-center"
        style={{ height: "200px", overflow: "hidden" }}
      >
        {birds.slice(randomNumber, randomNumber + 16).map((b, i) => {
          return <img key={i} src={b.images?.main} alt={b.name?.spanish} />;
        })}
      </div>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          height: "80px",
          overflow: "hidden",
          backgroundColor: "#8BC34A66",
        }}
      >
        <h2>{title}</h2>
      </div>

    </div>
  );
};

export { HeaderWithPhotos };
