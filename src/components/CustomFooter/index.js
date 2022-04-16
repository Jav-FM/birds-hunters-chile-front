import './Footer.scss'
import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";

const CustomFooter = ({ ...restOfProps }) => {
  return (
    <Navbar className="navbar  py-5" variant="dark" id="footer" {...restOfProps}>
      <Container fluid>
        <Nav id="footer-content" className="d-flex flex-column align-items-center justify-content-center">
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
