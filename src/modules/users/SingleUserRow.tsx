import {
  faCheckCircle,
  faEllipsisH,
  faEye,
  faInfoCircle,
  faMailForward,
  faTimesCircle,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Card, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useForgotPasswordMutation, useSendVerificationEmailMutation } from '../auth/auth.api';
import { useDeleteUserMutation } from './users.api';
import { IUserWithoutPassword } from './users.types';
import routes from '../common/routing/routes';

type Props = {
  user: IUserWithoutPassword;
};

const SingleUserRow = ({ user }: Props) => {
  const navigate = useNavigate();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [sendForgotPassword, { isLoading: resettingPassword }] = useForgotPasswordMutation();
  const [sendVerificationEmail, { isLoading: sending }] = useSendVerificationEmailMutation();
  const nameFirstLetters = user.name
    .split(' ')
    .map((i) => i.charAt(0))
    .join('')
    .toUpperCase();
  const verifiedIcon = user.isEmailVerified ? faCheckCircle : faInfoCircle;
  const verifiedVariant = user.isEmailVerified ? 'success' : 'danger';

  const handleDelete = async () => {
    await deleteUser({ id: user.id });
  };

  const handleResetPassword = async () => {
    await sendForgotPassword({ email: user.email })
      .unwrap()
      .then(() => {
        toast.success('Reset Password email sent successfully');
      });
  };

  const handleSendVerificationEmail = async () => {
    await sendVerificationEmail()
      .unwrap()
      .then(() => {
        toast.success('Verification email sent successfully');
      });
  };

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
          <Dropdown.Toggle as={Button} data-testid="singleUser-toggle" split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item disabled={resettingPassword} onClick={!resettingPassword ? handleResetPassword : () => {}}>
              {resettingPassword ? (
                'Resetting...'
              ) : (
                <span>
                  <FontAwesomeIcon icon={faUserShield} className="me-2" /> Reset Pass{' '}
                </span>
              )}
            </Dropdown.Item>
            <Dropdown.Item disabled={sending} onClick={!sending ? handleSendVerificationEmail : () => {}}>
              {sending ? (
                'Sending...'
              ) : (
                <span>
                  <FontAwesomeIcon icon={faMailForward} className="me-2" /> Verify Email{' '}
                </span>
              )}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate(`${routes.UserList.absolutePath}/${user.id}`)}>
              <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Button
            data-testid="singleUser-delete"
            variant="link"
            disabled={isLoading}
            className="text-danger ms-2"
            onClick={!isLoading ? handleDelete : () => {}}
          >
            {isLoading ? 'Deleting…' : <FontAwesomeIcon icon={faTimesCircle} />}
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

export default SingleUserRow;
