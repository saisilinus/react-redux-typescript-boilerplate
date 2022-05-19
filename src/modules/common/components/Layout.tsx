import React from 'react';
import { Col, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Footer from '../../dashboard/components/footer/Footer';
import NotifyContainer from './Notify';
import PublicNav from './PublicNav';

const Layout = () => {
  return (
    <Container fluid className="px-0 min-vh-100">
      <NotifyContainer />
      <Col className="d-flex flex-column justify-content-between min-vh-100">
        <div>
          <PublicNav />
          <Outlet />
        </div>
        <Footer />
      </Col>
    </Container>
  );
};

export default Layout;
