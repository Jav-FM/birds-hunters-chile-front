import React, { useState, useReducer, useEffect } from "react";
import "./BirdsGallery.scss";
import { Card, Pagination } from "react-bootstrap";
import {
  Spinner,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { FiCameraOff } from "react-icons/fi";
import { useSelector } from "react-redux";

const BirdsGallery = ({ birds, ...restOfProps }) => {
  const { loginState } = useSelector((state) => state.login);
  const userPhotos = useSelector((state) => state.userPhotos.userPhotos);
  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("");

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

  const initialState = {
    data: birds,
    offset: 0,
    numberPerPage: 12,
    pageCount: 0,
    currentData: [],
    activePage: 1,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (nameFilter !== "") {
      const filteredBirds = birds.filter((b) =>
        b.name.spanish.toLowerCase().includes(nameFilter.toLowerCase())
      );
      dispatch({ type: "setData", payload: filteredBirds });
    } else {
      dispatch({ type: "setData", payload: birds });
    }
  }, [nameFilter, birds]);

  useEffect(() => {
    dispatch({
      type: "setCurrentData",
      payload: state.data.slice(
        state.offset,
        state.offset + state.numberPerPage
      ),
    });
  }, [state.numberPerPage, state.offset, state.data, nameFilter, birds]);

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

  const handleChange = (e) => {
    e.preventDefault(); 
    setNameFilter(e.target.value); 
  };

  return (
    <React.Fragment>
      {birds.length !== 0 ? (
        <React.Fragment>
          <div className="container mb-4 mx-5">
            <InputGroup style={{ maxWidth: "400px" }} className="container mb-4 mx-4">
              <InputGroup.Text style={{ backgroundColor: "#bef67a" }}>
                Busca por nombre
              </InputGroup.Text>
              <FormControl
                style={{ width: "0px" }}
                type="text"
                value={nameFilter}
                onChange={handleChange}
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
                          <h3 style={{color: '#5a9216'}}>
                            <FaCamera />
                          </h3>
                        ) : (
                          <h3 style={{color: '#5a9216'}}>
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

            <Pagination className="mb-5" id="pagination" onClick={handlePaginationClick}>
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
