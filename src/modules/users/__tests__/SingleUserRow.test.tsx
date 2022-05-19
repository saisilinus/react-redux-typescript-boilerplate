import React from 'react';
import { render, screen, waitFor } from '../../../__mocks__/utils';
import SingleUserRow from '../SingleUserRow';
import { users } from '../../../__mocks__/data';
import server from '../../../__mocks__/server';
import NotifyContainer from '../../common/components/Notify';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Single User Row', () => {
  it('renders correctly', () => {
    render(
      <table>
        <tbody>
          <SingleUserRow user={users[0]} />
        </tbody>
      </table>
    );

    expect(screen.getByText(/John Paul/i)).toBeInTheDocument();
  });

  test('delete button works', async () => {
    const { user } = render(
      <table>
        <tbody>
          <SingleUserRow user={users[0]} />
        </tbody>
      </table>
    );

    await user.click(screen.getByTestId('singleUser-delete'));
    await waitFor(() => expect(screen.getByText(/Deleting…/i)).toBeInTheDocument());
  });

  test('reset password button works', async () => {
    const { user } = render(
      <div>
        <NotifyContainer />
        <table>
          <tbody>
            <SingleUserRow user={users[0]} />
          </tbody>
        </table>
      </div>
    );

    await user.click(screen.getByTestId('singleUser-toggle'));
    await user.click(screen.getByRole('button', { name: 'Reset Pass' }));
    await waitFor(() => expect(screen.getByText(/Resetting.../i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Reset Password email sent successfully/i)).toBeInTheDocument());
  });

  test('verify email button works', async () => {
    const { user } = render(
      <div>
        <NotifyContainer />
        <table>
          <tbody>
            <SingleUserRow user={users[0]} />
          </tbody>
        </table>
      </div>
    );

    await user.click(screen.getByTestId('singleUser-toggle'));
    await user.click(screen.getByRole('button', { name: 'Verify Email' }));
    await waitFor(() => expect(screen.getByText(/Sending.../i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Verification email sent successfully/i)).toBeInTheDocument());
  });

  test('view details button works', async () => {
    const { user } = render(
      <div>
        <NotifyContainer />
        <table>
          <tbody>
            <SingleUserRow user={users[0]} />
          </tbody>
        </table>
      </div>
    );

    await user.click(screen.getByTestId('singleUser-toggle'));
    await user.click(screen.getByRole('button', { name: 'View Details' }));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
  });
});
