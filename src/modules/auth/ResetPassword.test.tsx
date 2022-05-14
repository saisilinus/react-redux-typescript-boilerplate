import React from 'react';
import { Routing } from '../routing';
import { render, screen, waitFor } from '../testing/utils';
import ResetPassword from './ResetPassword';
import server from '../testing/server';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: () => [new URLSearchParams({ token: 'someToken' })],
  };
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Reset Password', () => {
  it('renders correctly', async () => {
    render(<ResetPassword />);

    expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();
  });

  test('back to login link works', async () => {
    const { user } = render(<Routing />, { route: 'reset-password' });

    await user.click(screen.getByText(/Back to login/i));

    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();
  });

  test('displays notification after successful submission', async () => {
    const { user } = render(<Routing />, { route: 'reset-password' });

    await user.type(screen.getByTestId('reset-password-password'), 'password2');
    await user.click(screen.getByTestId('reset-password-submit'));

    await waitFor(() => expect(screen.getByText(/Password reset was successful/i)).toBeInTheDocument());
  });

  test('navigates to login page after password reset success', async () => {
    const { user } = render(<Routing />, { route: 'reset-password' });

    await user.type(screen.getByTestId('reset-password-password'), 'password2');
    await user.click(screen.getByTestId('reset-password-submit'));

    await waitFor(() => expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument());
  });
});
