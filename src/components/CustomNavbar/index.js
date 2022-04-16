import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomNavbar = () => {
  const loading = useSelector((state) => state.loading.loading);

  return (
    <React.Fragment>
      {!loading ? (
        <Navbar expand="lg" collapseOnSelect className="navbar" variant="dark">
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
              </Nav>
              <Nav>
                <Nav.Link as={Link} to="/register">
                  Registrate
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Inicia sesión
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )
    :
    (
      <Navbar style={{height: '56px'}} collapseOnSelect className="navbar" variant="dark">
        <Container fluid>
        </Container>
      </Navbar>
    )
    }
    </React.Fragment>
  );
};

export { CustomNavbar };
