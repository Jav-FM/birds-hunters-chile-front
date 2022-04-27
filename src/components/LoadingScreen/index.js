import React, {useState, useEffect} from "react";
import "./LoadingScreen.scss";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const LoadingScreen = ({ ...restOfProps }) => {
  const { loginState } = useSelector((state) => state.login);
  const [spinnerPadding, setSpinnerPadding] = useState("0")

  //Definir padding según estado de login (por sidebar)
  useEffect(() => {
    if(loginState){ setSpinnerPadding("200px") } else {setSpinnerPadding("0")}
  }, [loginState])

  return (
    <div id="loading-screen" {...restOfProps} style={{paddingRight: `${spinnerPadding}`}}>
      <Spinner animation="border" id="spinner" />
    </div>
  );
};

export { LoadingScreen };
