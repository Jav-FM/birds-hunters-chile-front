import React, { useState, useReducer, useEffect } from "react";
import "./BirdsGallery.scss";
import { Card, Pagination, Button } from "react-bootstrap";
import { Spinner, InputGroup, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiCameraOff } from "react-icons/fi";
import { useSelector } from "react-redux";

const BirdsGallery = ({ birds, ...restOfProps }) => {
  const { loginState } = useSelector((state) => state.login);
  const userPhotos = useSelector((state) => state.userPhotos.userPhotos);
  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("");
  const [seeingCaptured, setSeeingCaptured] = useState(true);
  const [seeingNotCaptured, setSeeingNotCaptured] = useState(true);
  const [birdsForGallery, setBirdsForGallery] = useState(birds);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(12);

  //manejo filtro por nombre
  const handleChangeInput = (e) => {
    e.preventDefault();
    setNameFilter(e.target.value);
  };

  //Manejo de filtros por capturados
  const handleSetCaptured = () => {
    if (!seeingCaptured) {
      setSeeingCaptured(true);
    } else if (seeingCaptured && !seeingNotCaptured) {
      setSeeingCaptured(false);
      setSeeingNotCaptured(true);
    } else {
      setSeeingCaptured(false);
    }
  };

  //Manejo de filtros por no capturados
  const handleSetNotCaptured = () => {
    if (!seeingNotCaptured) {
      setSeeingNotCaptured(true);
    } else if (seeingNotCaptured && !seeingCaptured) {
      setSeeingNotCaptured(false);
      setSeeingCaptured(true);
    } else {
      setSeeingNotCaptured(false);
    }
  };

  //Aplicacion de filtros
  useEffect(() => {
    setCurrentPage(1);
    const captureBirdsIds = userPhotos.map((p) => p.bird_id);
    let filteredBirds = birds;
    if (!seeingCaptured) {
      filteredBirds = birds.filter((b) => !captureBirdsIds.includes(b.uid));
    } else if (!seeingNotCaptured) {
      filteredBirds = birds.filter((b) => captureBirdsIds.includes(b.uid));
    }
    if (nameFilter !== "") {
      const nameFilteredBirds = filteredBirds.filter((b) =>
        b.name.spanish.toLowerCase().includes(nameFilter.toLowerCase())
      );
      setBirdsForGallery(nameFilteredBirds)
    } else {
      setBirdsForGallery(filteredBirds)
    }
  }, [seeingCaptured, seeingNotCaptured, nameFilter, birds]);

  //Index para paginador
  const indexOfLastBird = currentPage * cardsPerPage;
  const indexOfFirstBird = indexOfLastBird - cardsPerPage;
  const currentBirds = birdsForGallery.slice(indexOfFirstBird, indexOfLastBird);

  //Creacion de paginas para paginator
  const paginationItems = [];
  for (let i = 1; i <= Math.ceil(birdsForGallery.length / cardsPerPage); i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === currentPage} data-page={i}>
        {i}
      </Pagination.Item>
    );
  }

  //Manejo de clics en paginador
  const handlePaginationClick = (e) => {
    const clickValue = parseInt(e.target.getAttribute("data-page"), 10);
    setCurrentPage(clickValue);
  };

  return (
    <React.Fragment>
      {birds.length !== 0 ? (
        <React.Fragment>
          <div className="container my-5 mx-5 d-flex justify-content-between flex-wrap">
            <InputGroup
              style={{ maxWidth: "400px" }}
              className="container mb-4 mx-4"
            >
              <InputGroup.Text style={{ backgroundColor: "#bef67a" }}>
                Busca por nombre
              </InputGroup.Text>
              <FormControl
                style={{ width: "0px" }}
                type="text"
                value={nameFilter}
                onChange={handleChangeInput}
              />
            </InputGroup>
            {(loginState && userPhotos.length) > 0 && (
              <div className="d-flex gap-2 mx-5" style={{ height: "40px" }}>
                {seeingCaptured ? (
                  <Button
                    variant="primary"
                    style={{ width: "160px" }}
                    className="d-flex align-items-center justify-content-evenly"
                    onClick={handleSetCaptured}
                  >
                    <FaEye /> Capturadas
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    style={{ width: "160px" }}
                    className="d-flex align-items-center justify-content-evenly"
                    onClick={handleSetCaptured}
                  >
                    <FaEyeSlash /> Capturadas
                  </Button>
                )}
                {seeingNotCaptured ? (
                  <Button
                    variant="primary"
                    style={{ width: "160px" }}
                    className="d-flex align-items-center justify-content-evenly"
                    onClick={handleSetNotCaptured}
                  >
                    <FaEye /> No capturadas
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    style={{ width: "160px" }}
                    className="d-flex align-items-center justify-content-evenly"
                    onClick={handleSetNotCaptured}
                  >
                    <FaEyeSlash /> No capturadas
                  </Button>
                )}
              </div>
            )}
          </div>

          <div
            className="container d-flex flex-column align-items-center"
            id="birds-gallery"
            {...restOfProps}
          >
            <div className="d-flex flex-wrap gap-4 justify-content-center mb-4">
              {currentBirds &&
                currentBirds.map((item, index) => (
                  <Card
                    className="bird-card"
                    key={index}
                    style={{ width: "18rem" }}
                    onClick={() => navigate(`/avepedia/${item.uid}`)}
                  >
                    <Card.Img variant="top" src={item.images?.main} />
                    {loginState ? (
                      <Card.Body className="pb-2 d-flex justify-content-between align-items-end">
                        <Card.Title>{item.name?.spanish}</Card.Title>
                        {userPhotos.filter((p) => p.bird_id === item.uid)
                          .length > 0 ? (
                          <h3 style={{ color: "#5a9216" }}>
                            <FaCamera />
                          </h3>
                        ) : (
                          <h3 style={{ color: "#5a9216" }}>
                            <FiCameraOff />
                          </h3>
                        )}
                      </Card.Body>
                    ) : (
                      <Card.Body className="pb-2 d-flex justify-content-center align-items-end">
                        <Card.Title>{item.name?.spanish}</Card.Title>
                      </Card.Body>
                    )}
                  </Card>
                ))}
            </div>

            <Pagination
              className="mb-5"
              id="pagination"
              onClick={handlePaginationClick}
            >
              {paginationItems}
            </Pagination>
          </div>
        </React.Fragment>
      ) : (
        <Spinner animation="border" className="spinner my-5" />
      )}
    </React.Fragment>
  );
};

export { BirdsGallery };
