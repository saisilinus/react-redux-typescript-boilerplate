import { faAngleLeft, faEnvelope, faUnlockAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import Loader from '../common/loader/Loader';
import { useRegisterMutation } from './auth.api';
import routes from '../routing/routes';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rememberMe = localStorage.getItem('rememberMe');

    await registerUser({ name, email, password })
      .unwrap()
      .then((payload) => {
        if (rememberMe === 'true') {
          localStorage.setItem('accessToken', payload.tokens.access.token);
          localStorage.setItem('refreshToken', payload.tokens.refresh.token);
          localStorage.setItem('userId', payload.user.id);
        } else {
          sessionStorage.setItem('accessToken', payload.tokens.access.token);
          sessionStorage.setItem('refreshToken', payload.tokens.refresh.token);
          sessionStorage.setItem('userId', payload.user.id);
        }
        navigate('/');
      });
  }

  return (
    <main>
      <Loader show={isLoading} />
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={`/${routes.Login.path}`} className="text-dark">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to login
            </Card.Link>
          </p>
          <Row className="justify-content-center">
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white border rounded border-light p-4 p-lg-5 w-lg-50 w-md-100">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Register</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="name" className="mb-4">
                    <Form.Label>Your Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control
                        name="name"
                        autoFocus
                        required
                        type="text"
                        placeholder="John Doe"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        name="email"
                        autoFocus
                        required
                        type="email"
                        placeholder="example@company.com"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        name="password"
                        required
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Register
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Register;
