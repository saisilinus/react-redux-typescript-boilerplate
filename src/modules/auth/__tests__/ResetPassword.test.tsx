import React from 'react';
import * as router from 'react-router-dom';
import { Routing } from '../../common/routing';
import { render, screen, waitFor } from '../../../__mocks__/utils';
import ResetPassword from '../ResetPassword';
import server from '../../../__mocks__/server';
import NotifyContainer from '../../common/components/Notify';
import routes from '../../common/routing/routes';

const mockRouter = router as unknown as { useSearchParams: () => URLSearchParams[] };

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: null,
  };
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Reset Password', () => {
  it('renders correctly', async () => {
    mockRouter.useSearchParams = () => [new URLSearchParams({ token: 'someToken' })];
    render(<ResetPassword />);

    expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();
  });

  test('back to login link works', async () => {
    mockRouter.useSearchParams = () => [new URLSearchParams({ token: 'someToken' })];
    const { user } = render(<Routing />, { route: routes.ResetPassword.absolutePath });

    await user.click(screen.getByRole('link', { name: 'Back to login' }));

    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();
  });

  test('displays notification after successful submission', async () => {
    mockRouter.useSearchParams = () => [new URLSearchParams({ token: 'someToken' })];
    const { user } = render(
      <div>
        <NotifyContainer />
        <ResetPassword />
      </div>
    );

    await user.type(screen.getByTestId('reset-password-password'), 'password2');
    await user.click(screen.getByRole('button', { name: 'Reset' }));

    await waitFor(() => expect(screen.getByText(/Password reset was successful/i)).toBeInTheDocument());
  });

  test('navigates to login page after password reset success', async () => {
    mockRouter.useSearchParams = () => [new URLSearchParams({ token: 'someToken' })];
    const { user } = render(<Routing />, { route: routes.ResetPassword.absolutePath });

    await user.type(screen.getByTestId('reset-password-password'), 'password2');
    await user.click(screen.getByRole('button', { name: 'Reset' }));

    await waitFor(() => expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument());
  });

  test('notifies user if token is missing', async () => {
    mockRouter.useSearchParams = () => [new URLSearchParams({})];
    const { user } = render(
      <div>
        <NotifyContainer />
        <ResetPassword />
      </div>
    );

    await user.type(screen.getByTestId('reset-password-password'), 'password2');
    await user.click(screen.getByRole('button', { name: 'Reset' }));

    await waitFor(() => expect(screen.getByText(/Your token is invalid/i)).toBeInTheDocument());
  });
});
