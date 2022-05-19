import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Card, Col, Form, InputGroup, Row, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../common/components/Loader';
import { useCreateUserMutation } from './users.api';
import formatNames from '../common/utils/formatName';
import Animate from '../common/components/Animate';

const NewUser = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('user');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await createUser({ name: formatNames([firstName, lastName]), email, password, role })
      .unwrap()
      .then((user) => {
        toast.success(`${user.name} has been successfully registered!`);
      });
  }

  return (
    <>
      <Loader show={isLoading} />
      <Animate>
        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-4">User Details</h5>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      data-testid="newUser-firstName"
                      required
                      type="text"
                      placeholder="Enter your first name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      data-testid="newUser-lastName"
                      required
                      type="text"
                      placeholder="Also your last name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Select data-testid="newUser-role" defaultValue="user" onChange={(e) => setRole(e.target.value)}>
                      <option>Choose a role</option>
                      <option value="user" data-testid="newUser-role-user">
                        User
                      </option>
                      <option value="admin">Admin</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faAt} />
                      </InputGroup.Text>
                      <Form.Control
                        data-testid="newUser-email"
                        required
                        type="email"
                        placeholder="name@company.com"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faKey} />
                    </InputGroup.Text>
                    <Form.Control
                      data-testid="newUser-password"
                      required
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row>
                <Button variant="primary" type="submit" className="w-100" data-testid="newUser-submit">
                  Create
                </Button>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Animate>
    </>
  );
};

export default NewUser;
