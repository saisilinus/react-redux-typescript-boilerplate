import {
  faCog,
  faEnvelopeOpen,
  faSearch,
  faSignOutAlt,
  faUserCircle,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Dropdown, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../../app/hooks';

import { useLogoutMutation } from '../../../auth/auth.api';
import Loader from '../../../common/components/Loader';
import routes from '../../../common/routing/routes';
import { useCurrentUser } from '../../../users/users.api';
import api from '../../../../app/api';

const DashNav = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const user = useCurrentUser();

  async function handleLogout() {
    const refreshToken = sessionStorage.getItem('refreshToken') || localStorage.getItem('refreshToken');
    if (!refreshToken) {
      toast.error('You have to be logged in to log out');
    } else {
      await logout({ refreshToken })
        .unwrap()
        .then(() => {
          navigate(routes.Login.absolutePath, { replace: true, state: { from: location } });
          dispatch(api.util.resetApiState());
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userId');
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
          sessionStorage.removeItem('userId');
        });
    }
  }

  return (
    <>
      <Loader show={isLoading} />
      <Navbar variant="dark" expanded className="ps-0 pe-2 py-1">
        <Container fluid className="px-0">
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex align-items-center">
              <Form className="navbar-search">
                <Form.Group id="topbarSearch">
                  <InputGroup className="input-group-merge search-bar">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="Search" />
                  </InputGroup>
                </Form.Group>
              </Form>
            </div>
            <Nav className="align-items-center">
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} className="pt-3 px-0 align-items-center">
                  <div className="media d-flex">
                    <div className="media-body ms-2 text-dark d-none d-lg-block">
                      <span className="mb-0 font-small fw-bold">{user?.name ?? 'unknown'}</span>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-dropdown dropdown-menu-left mt-2" align="end">
                  <Dropdown.Item className="fw-bold" as={Link} to={routes.Profile.absolutePath}>
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
                  </Dropdown.Item>
                  <Dropdown.Item className="fw-bold">
                    <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
                  </Dropdown.Item>
                  <Dropdown.Item className="fw-bold">
                    <FontAwesomeIcon icon={faEnvelopeOpen} className="me-2" /> Messages
                  </Dropdown.Item>
                  <Dropdown.Item className="fw-bold">
                    <FontAwesomeIcon icon={faUserShield} className="me-2" /> Support
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item className="fw-bold" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default DashNav;
