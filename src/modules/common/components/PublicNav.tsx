import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routes from '../routing/routes';

const PublicNav = () => {
  return (
    <Navbar sticky="top" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
          <Nav>
            <Nav.Link eventKey="dashboard" as={Link} to={routes.Dashboard.relativePath}>
              Dashboard
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNav;
