import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Card, Col, Form, InputGroup, Row, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Loader from '../common/components/Loader';
import { useGetSingleUserQuery, useUpdateUserMutation } from './users.api';
import formatNames from '../common/utils/formatName';
import sanitize from '../common/utils/sanitize';
import splitName from '../common/utils/splitName';
import checkOneOf from '../common/utils/checkOneOf';
import Animate from '../common/components/Animate';

const EditUser = () => {
  const { id } = useParams();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (!id) return <div>No User Found</div>;

  const { data } = useGetSingleUserQuery({ id });

  if (!data) return <div>No User Found</div>;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = sanitize({ name: formatNames([firstName, lastName]), email, password });

    if (!id) toast.error('User ID is not available');
    else if (checkOneOf([firstName, lastName, email, password])) toast.error('Please fill at least one field');
    else {
      await updateUser({ id, body })
        .unwrap()
        .then((updatedUser) => {
          toast.success(`${updatedUser.name} has been successfully updated!`);
        });
    }
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
                      data-testid="editUser-firstName"
                      required={false}
                      type="text"
                      defaultValue={splitName(data.name)[0]}
                      placeholder="Enter your first name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      data-testid="editUser-lastName"
                      required={false}
                      type="text"
                      defaultValue={splitName(data.name)[1]}
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
                        data-testid="editUser-email"
                        required={false}
                        type="email"
                        defaultValue={data.email ?? ''}
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
                        data-testid="editUser-password"
                        required={false}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Button variant="primary" type="submit" className="w-100" data-testid="editUser-submit">
                  Update
                </Button>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Animate>
    </>
  );
};

export default EditUser;
