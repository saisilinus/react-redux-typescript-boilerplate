import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../common/components/Loader';
import { useVerifyEmailMutation } from './auth.api';
import routes from '../common/routing/routes';
import Animate from '../common/components/Animate';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [verifyUserEmail, { isLoading }] = useVerifyEmailMutation();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) {
      toast.error('Your token is invalid');
    } else {
      await verifyUserEmail({ token })
        .unwrap()
        .then(() => {
          toast('Your email was successfully verified');
          navigate(routes.Login.absolutePath);
        });
    }
  }

  return (
    <main>
      <Loader show={isLoading} />
      <Animate>
        <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
          <Container>
            <p className="text-center">
              <Card.Link as={Link} to={routes.Login.absolutePath} className="text-dark">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to login
              </Card.Link>
            </p>
            <Row className="justify-content-center">
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <div className="bg-white border rounded border-light p-4 p-lg-5 w-lg-50 w-md-100">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">Verify Your Email</h3>
                  </div>
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Button variant="primary" type="submit" className="w-100" data-testid="verify-email-submit">
                      Verify
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Animate>
    </main>
  );
};

export default VerifyEmail;
