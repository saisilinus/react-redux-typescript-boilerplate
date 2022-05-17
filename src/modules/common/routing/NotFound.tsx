import React from 'react';
import { Col, Container, Row, Card, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import NotFoundImage from '../../../assets/img/illustrations/404.svg';
import routes from './routes';
import Animate from '../components/Animate';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main>
      <Animate>
        <section className="vh-100 d-flex align-items-center justify-content-center">
          <Container>
            <Row>
              <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
                <div>
                  <Card.Link as={Link} to={routes.Home.relativePath}>
                    <Image src={NotFoundImage} className="img-fluid w-75" style={{ maxHeight: '50vh' }} />
                  </Card.Link>
                  <h1 className="text-primary mt-5">
                    Page not <span className="fw-bolder">found</span>
                  </h1>
                  <p className="lead my-4">
                    Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.
                  </p>
                  <Button variant="primary" className="animate-hover" onClick={() => navigate(routes.Home.relativePath)}>
                    <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" />
                    Go back home
                  </Button>
                </div>
              </Col>
            </Row>
            <div className="text-center mt-3">
              <a href="https://storyset.com/web">Web illustrations by Storyset</a>
            </div>
          </Container>
        </section>
      </Animate>
    </main>
  );
};

export default NotFound;
