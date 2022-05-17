import { faAngleLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../common/components/Loader';
import { useForgotPasswordMutation } from './auth.api';
import routes from '../common/routing/routes';
import Animate from '../common/components/Animate';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sendForgotPassword, { isLoading }] = useForgotPasswordMutation();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await sendForgotPassword({ email })
      .unwrap()
      .then(() => {
        toast.success('Please check your email for a password reset link');
      });
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
                    <h3 className="mb-0">Enter email to reset password</h3>
                  </div>
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Your Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          data-testid="forgot-password-email"
                          name="email"
                          autoFocus
                          required
                          type="email"
                          placeholder="example@company.com"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100" data-testid="forgot-password-submit">
                      Send
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

export default ForgotPassword;
