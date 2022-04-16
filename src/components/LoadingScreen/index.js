import React from "react";
import "./LoadingScreen.scss";
import { Spinner } from "react-bootstrap";

const LoadingScreen = ({ ...restOfProps }) => {
  return (
    <div id="loading-screen" {...restOfProps}>
      <Spinner animation="border" id="spinner" />
    </div>
  );
};

export { LoadingScreen };
