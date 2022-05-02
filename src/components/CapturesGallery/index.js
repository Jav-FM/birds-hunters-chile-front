import React, { useState, useReducer, useEffect } from "react";
import "./CapturesGallery.scss";
import { Card, Pagination } from "react-bootstrap";
import { Spinner, InputGroup, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CapturesGallery = ({ ...restOfProps }) => {
  const userPhotos = useSelector((state) => state.userPhotos.userPhotos);
  const navigate = useNavigate();
  const [ordersForSelector, setOrdersForSelector] = useState([]);
  const [filteredOrder, setFilteredOrder] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [photosForGallery, setPhotosForGallery] = useState(userPhotos);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(12);

  //Filtro por orden taxonomico
  useEffect(() => {
    const orders = userPhotos.map((p) => p.order);
    const result = orders.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
    setOrdersForSelector(result);
  }, [userPhotos]);

  //manejo de cambio en input para filtro de nombres
  const handleChangeInput = (e) => {
    e.preventDefault(); // prevent the default action
    setNameFilter(e.target.value); // set name to e.target.value (event)
  };

  //aplicación de filtros por nombre y por orden taxonómico
  useEffect(() => {
    setCurrentPage(1);
    if (nameFilter !== "" && filteredOrder === "") {
      const filteredPhotosByName = userPhotos.filter((b) =>
        b.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
      setPhotosForGallery(filteredPhotosByName);
    } else if (nameFilter === "" && filteredOrder !== "") {
      const filteredPhotosByOrder = userPhotos.filter(
        (b) => b.order === filteredOrder
      );
      setPhotosForGallery(filteredPhotosByOrder);
    } else if (nameFilter !== "" && filteredOrder !== "") {
      const filteredPhotosByOrder = userPhotos.filter(
        (b) => b.order === filteredOrder
      );
      const filteredPhotosByOrderAndName = filteredPhotosByOrder.filter((b) =>
        b.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
      setPhotosForGallery(filteredPhotosByOrderAndName);
    } else {
      setPhotosForGallery(userPhotos);
    }
  }, [nameFilter, filteredOrder, userPhotos]);

  //Index para paginador
  const indexOfLastPhoto = currentPage * cardsPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - cardsPerPage;
  const currentPhotos = photosForGallery.slice(
    indexOfFirstPhoto,
    indexOfLastPhoto
  );

  //Creacion de paginas para paginator
  const paginationItems = [];
  for (let i = 1; i <= Math.ceil(photosForGallery.length / cardsPerPage); i++) {
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
      {userPhotos.length !== 0 ? (
        <React.Fragment>
          <div className="container d-flex flex-wrap gap-3 my-5 justify-content-around">
            <InputGroup style={{ maxWidth: "400px", height: "0px" }}>
              <InputGroup.Text style={{ backgroundColor: "#bef67a" }}>
                Selecciona taxonomía
              </InputGroup.Text>
              <Form.Control
                as="select"
                value={filteredOrder}
                onChange={(e) => setFilteredOrder(e.target.value)}
              >
                <option key={0} value={""}>
                  Todas
                </option>
                {ordersForSelector.map((o, i) => (
                  <option key={i + 1} value={o}>
                    {o}
                  </option>
                ))}
              </Form.Control>
            </InputGroup>
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
          </div>

          <div
            className="container d-flex flex-column align-items-center"
            id="birds-gallery"
            {...restOfProps}
          >
            <div className="d-flex flex-wrap gap-4 justify-content-center mb-4">
              {currentPhotos &&
                currentPhotos.map((item, index) => (
                  <Card
                    className="bird-card"
                    key={index}
                    style={{ width: "25rem" }}
                    onClick={() => navigate(`/mycapturesdetail/${item.id}`)}
                  >
                    <Card.Img variant="top" src={item.photo} />

                    <Card.Body className="pb-2 d-flex justify-content-center align-items-end">
                      <Card.Title>{item.name}</Card.Title>
                    </Card.Body>
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

export { CapturesGallery };
