import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import React from "react";

const CustomNavbar = ({ navigation }) => {
  return (
    <Navbar className="navbar" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Birds Hunters</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/avepedia">Avepedia</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
        <Nav >
          <Nav.Link as={Link} to="/register">Registrate</Nav.Link>
          <Nav.Link as={Link} to="/login">Inicia sesión</Nav.Link>
        </Nav>
    </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { CustomNavbar };
