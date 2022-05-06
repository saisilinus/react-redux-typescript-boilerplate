import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import DashNav from '../navbar/DashNav';

import DrawerNav from '../sidebar/DrawerNav';

const SidebarLayout = () => {
  return (
    <Container fluid>
      <Row className="flex-xl-nowrap">
        <Col xs={12} md={3} lg={2} className="px-0">
          <DrawerNav />
        </Col>
        <Col xs={12} md={9} lg={10} className="d-flex flex-column justify-content-between">
          <div>
            <DashNav />
            <Outlet />
          </div>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default SidebarLayout;
