import './Footer.scss'
import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";

const CustomFooter = ({ navigation }) => {
  return (
    <Navbar className="navbar fixed-bottom py-5" variant="dark">
      <Container fluid>
        <Nav className="mx-auto d-flex flex-column align-items-center">
          <Nav.Item className="footer-item">
          © Birds Hunters 2022
          </Nav.Item>
          <Nav.Item className="footer-item">
            Este sitio utiliza la API disponibilizada por
            https://aves.ninjas.cl/
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export { CustomFooter };
