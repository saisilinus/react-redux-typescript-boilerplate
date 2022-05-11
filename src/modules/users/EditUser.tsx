import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Card, Col, Form, InputGroup, Row, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Loader from '../common/loader/Loader';
import { getUserFromList, useUpdateUserMutation } from './users.api';
import { formatNames } from './NewUser';

const EditUser = () => {
  const { id } = useParams();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (!id) return <div>No User Found</div>;

  const user = getUserFromList(id);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!id) toast.error('User ID is not available');
    else {
      await updateUser({ id, body: { name: formatNames([firstName, lastName]), email, password } })
        .unwrap()
        .then((updatedUser) => {
          toast.success(`${updatedUser.name} has been successfully updated!`);
        });
    }
  }

  const splitName = (name: string | undefined): string[] => (name ? name.split(' ') : ['', '']);

  return (
    <>
      <Loader show={isLoading} />
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">User Details</h5>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={splitName(user?.name)[0]}
                    placeholder="Enter your first name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={splitName(user?.name)[-1]}
                    placeholder="Also your last name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faAt} />
                    </InputGroup.Text>
                    <Form.Control
                      required
                      type="email"
                      defaultValue={user?.email ?? ''}
                      placeholder="name@company.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faKey} />
                    </InputGroup.Text>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Button variant="primary" type="submit" className="w-100">
                Update
              </Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditUser;
