import {
  faCheckCircle,
  faEllipsisH,
  faEye,
  faInfoCircle,
  faTimesCircle,
  faUserShield,
  faUserTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, ButtonGroup, Card, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { IUserWithoutPassword } from './users.types';

type Props = {
  user: IUserWithoutPassword;
};

const SingleUserRow = ({ user }: Props) => {
  const nameFirstLetters = user.name
    .split(' ')
    .map((i) => i.charAt(0))
    .join('')
    .toUpperCase();
  const verifiedIcon = user.isEmailVerified ? faCheckCircle : faInfoCircle;
  const verifiedVariant = user.isEmailVerified ? 'success' : 'primary';

  return (
    <tr key={user.id}>
      <td>
        <Card.Link className="d-flex align-items-center">
          <div className="user-avatar bg-secondary me-3">
            <span>{nameFirstLetters}</span>
          </div>
          <div className="d-block">
            <span className="fw-bold">{user.name}</span>
            <div className="small text-gray">{user.email}</div>
          </div>
        </Card.Link>
      </td>
      <td>
        <span className="fw-normal">{user.role}</span>
      </td>
      <td>
        <span className="fw-normal">
          <FontAwesomeIcon icon={verifiedIcon} className={`text-${verifiedVariant} me-2`} />
          Email
        </span>
      </td>
      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> Reset Pass
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
            </Dropdown.Item>
            <Dropdown.Item className="text-danger">
              <FontAwesomeIcon icon={faUserTimes} className="me-2" /> Suspend
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Card.Link className="text-danger ms-2">
            <FontAwesomeIcon icon={faTimesCircle} />
          </Card.Link>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

export default SingleUserRow;
