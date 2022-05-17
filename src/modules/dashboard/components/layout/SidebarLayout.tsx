import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NotifyContainer from '../../../common/components/Notify';
import Footer from '../footer/Footer';
import DashNav from '../navbar/DashNav';
import Sidebar from '../sidebar/Sidebar';

// import DrawerNav from '../sidebar/DrawerNav';

const SidebarLayout = () => {
  return (
    <Container fluid className="px-0">
      <NotifyContainer />
      <Row className="flex-xl-nowrap px-0 mx-0 sidebar layout">
        <Col xs={12} md={3} lg={2} className="px-0 mb-2 mb-md-0">
          {/* <DrawerNav /> */}
          <Sidebar />
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
