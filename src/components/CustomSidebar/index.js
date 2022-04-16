import React from "react";
import "./CustomSidebar.scss";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomSidebar = ({ ...restOfProps }) => {
  const loading = useSelector((state) => state.loading.loading);

  return (
    <React.Fragment>
      {!loading ? (
        <Navbar
          id="sidebar"
          expand="lg"
          collapseOnSelect
          className="sidebar d-flex align-items-start"
          variant="dark"
          {...restOfProps}
        >
          <Container className="d-flex flex-column">
            <Nav className="me-auto d-flex flex-column pt-4">
              <Nav.Link as={Link} to="/">
                Mis capturas
              </Nav.Link>
              <Nav.Link as={Link} to="/avepedia">
                Nueva captura
              </Nav.Link>
              <Nav.Link as={Link} to="/avepedia">
                Editar perfil
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      ) : (
        <Navbar
          id="sidebar"
          expand="lg"
          collapseOnSelect
          className="sidebar d-flex align-items-start"
          variant="dark"
          {...restOfProps}
        >
          <Container></Container>
        </Navbar>
      )}
    </React.Fragment>
  );
};

export { CustomSidebar };
