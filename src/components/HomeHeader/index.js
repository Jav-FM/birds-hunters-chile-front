import React from "react";
import "./HomeHeader.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeHeader = () => {
  return (
    <div id="home-header" className="jumbotron jumbotron-fluid py-5">
      <div className="d-flex flex-column align-items-center my-4">
        <div
          id="home_header-title_container"
          className="d-flex flex-column align-items-end"
        >
          <h1 id="home_header-title" className="display-4">
            Birds Hunters
          </h1>
          <h4 id="home_header-version">Chile</h4>
        </div>
        <h5 id="home_header-subtitle">
          Colecciona aves nativas con tu cámara
        </h5>
        <Button variant="primary mt-5" as={Link} to="/avepedia">
          Ir a Avepedia
        </Button>
      </div>
    </div>
  );
};

export { HomeHeader };
