import React from "react";
import "./CustomNavbar.scss";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../store/loading";
import { loginActions } from "../../store/login";
import { userPhotosActions } from "../../store/userPhotos";
import { useNavigate } from "react-router-dom";
import { isLoginTokenValid } from "../../utils/token";

const CustomNavbar = ({ ...restOfProps }) => {
  const loading = useSelector((state) => state.loading.loading);
  const { loginState } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Manejo de logout, se borra token de localStorage y se "vacía" el store de redux
  const handleLogout = () => {
    dispatch(loadingActions.setLoading(true));
    localStorage.removeItem("token");
    dispatch(loginActions.logout());
    dispatch(userPhotosActions.setUserPhotos([]));
    navigate("/");
  };

  return (
    <React.Fragment>
      {!loading ? (
        <Navbar
          id="navbar"
          expand="lg"
          collapseOnSelect
          className="navbar"
          variant="dark"
          {...restOfProps}
        >
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              Birds Hunters
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Inicio
                </Nav.Link>
                <Nav.Link as={Link} to="/avepedia">
                  Avepedia
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                  Sobre Birds Hunters
                </Nav.Link>
              </Nav>
              {loginState && isLoginTokenValid() ? (
                <Nav>
                  <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
                </Nav>
              ) : (
                <Nav>
                  <Nav.Link as={Link} to="/register">
                    Regístrate
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Inicia sesión
                  </Nav.Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar
          id="navbar"
          style={{ height: "56px" }}
          collapseOnSelect
          className="navbar"
          variant="dark"
        >
          <Container fluid></Container>
        </Navbar>
      )}
    </React.Fragment>
  );
};

export { CustomNavbar };
