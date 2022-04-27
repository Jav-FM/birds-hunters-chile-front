import React, { useState, useReducer, useEffect } from "react";
import "./CapturesGallery.scss";
import { Card, Pagination } from "react-bootstrap";
import { Spinner, InputGroup, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CapturesGallery = ({ ...restOfProps }) => {
  const userPhotos = useSelector((state) => state.userPhotos.userPhotos);
  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("");
  const [ordersForSelector, setOrdersForSelector] = useState([]);
  const [filteredOrder, setFilteredOrder] = useState("");

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

  //reducer de paginador
  const reducer = (state, action) => {
    switch (action.type) {
      case "setData":
        return { ...state, data: action.payload };
      case "setPageCount":
        return { ...state, pageCount: action.payload };
      case "setCurrentData":
        return { ...state, currentData: action.payload };
      case "setOffset":
        return { ...state, offset: action.payload };
      case "setActivePage":
        return { ...state, activePage: action.payload };
      default:
        throw new Error();
    }
  };

  //estado inicial de paginador
  const initialState = {
    data: userPhotos,
    offset: 0,
    numberPerPage: 12,
    pageCount: 0,
    currentData: [],
    activePage: 1,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  //aplicación de filtros por nombre y por orden taxonómico
  useEffect(() => {
    if (nameFilter !== "" && filteredOrder === "") {
      const filteredPhotosByName = userPhotos.filter((b) =>
        b.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
      dispatch({ type: "setData", payload: filteredPhotosByName });
    } else if (nameFilter === "" && filteredOrder !== "") {
      const filteredPhotosByOrder = userPhotos.filter(
        (b) => b.order === filteredOrder
      );
      dispatch({ type: "setData", payload: filteredPhotosByOrder });
    } else if (nameFilter !== "" && filteredOrder !== "") {
      const filteredPhotosByOrder = userPhotos.filter(
        (b) => b.order === filteredOrder
      );
      const filteredPhotosByOrderAndName = filteredPhotosByOrder.filter((b) =>
        b.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
      dispatch({ type: "setData", payload: filteredPhotosByOrderAndName });
    } else {
      dispatch({ type: "setData", payload: userPhotos });
    }
  }, [nameFilter, filteredOrder, userPhotos]);

  //Dispatch de paginador
  useEffect(() => {
    dispatch({
      type: "setCurrentData",
      payload: state.data.slice(
        state.offset,
        state.offset + state.numberPerPage
      ),
    });
  }, [state.numberPerPage, state.offset, state.data, nameFilter, userPhotos]);

  //manejo de clics en paginador
  const handlePaginationClick = (e) => {
    const clickValue = parseInt(e.target.getAttribute("data-page"), 10);
    dispatch({
      type: "setOffset",
      payload: (clickValue - 1) * state.numberPerPage,
    });
    dispatch({
      type: "setActivePage",
      payload: clickValue,
    });
    dispatch({
      type: "setPageCount",
      payload: state.data.length / state.numberPerPage,
    });
  };

  //Definicion de paginas en paginador
  const paginationItems = [];
  const amountPages = state.data.length / state.numberPerPage;
  for (let number = 1; number <= amountPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === state.activePage}
        data-page={number}
      >
        {number}
      </Pagination.Item>
    );
  }

  //manejo de cambio en input para filtro de nombres
  const handleChangeInpur = (e) => {
    e.preventDefault(); // prevent the default action
    setNameFilter(e.target.value); // set name to e.target.value (event)
  };

  return (
    <React.Fragment>
      {userPhotos.length !== 0 ? (
        <React.Fragment>
          <div className="container d-flex flex-wrap gap-3 mb-4 justify-content-around">
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
                onChange={handleChangeInpur}
              />
            </InputGroup>
          </div>

          <div
            className="container d-flex flex-column align-items-center"
            id="birds-gallery"
            {...restOfProps}
          >
            <div className="d-flex flex-wrap gap-4 justify-content-center mb-4">
              {state.currentData &&
                state.currentData.map((item, index) => (
                  <React.Fragment>
                    <Card
                      className="bird-card"
                      key={index}
                      style={{ width: "25rem" }}
                      onClick={() => navigate(`/mycapturesdetail/${item.id}`)}
                    >
                      <Card.Img
                        variant="top"
                        src={`https://birdshunters-chile-server.herokuapp.com/birdsphotos/${item.photo}`}
                      />

                      <Card.Body className="pb-2 d-flex justify-content-center align-items-end">
                        <Card.Title>{item.name}</Card.Title>
                      </Card.Body>
                    </Card>
                  </React.Fragment>
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
