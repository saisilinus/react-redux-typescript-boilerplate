import React from 'react';
import { render, screen, waitFor } from '../testing/utils';
import Login from './Login';
import server from '../testing/server';
import { Routing } from '../routing';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Login', () => {
  test('render correctly', async () => {
    render(<Login />);

    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();
  });

  test('logs in user and redirects to requested page', async () => {
    const { user } = render(<Routing />);

    await user.click(screen.getByText(/Dashboard/i));

    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();

    await user.type(screen.getByTestId('login-email'), 'Some Name');
    await user.type(screen.getByTestId('login-password'), 'Some Password');
    await user.click(screen.getByTestId('login-submit'));

    await waitFor(() => expect(screen.getByText(/DashboardHome/i)).toBeInTheDocument());
  });

  test('redirects to home page after login', async () => {
    const { user } = render(<Routing />, { route: 'login' });

    await user.type(screen.getByTestId('login-email'), 'Some Name');
    await user.type(screen.getByTestId('login-password'), 'Some Password');
    await user.click(screen.getByTestId('login-submit'));

    await waitFor(() => expect(screen.getByText(/Just a simple react bootstrap/i)).toBeInTheDocument());
  });

  test('back home link works', async () => {
    const { user } = render(<Routing />, { route: 'login' });

    await user.click(screen.getByText(/Back to homepage/i));

    expect(screen.getByText(/Just a simple react bootstrap/i)).toBeInTheDocument();
  });

  test('lost password link works', async () => {
    const { user } = render(<Routing />, { route: 'login' });

    await user.click(screen.getByText(/Lost password?/i));

    expect(screen.getByText(/Enter email to reset password/i)).toBeInTheDocument();
  });

  test('register link works', async () => {
    const { user } = render(<Routing />, { route: 'login' });

    await user.click(screen.getByText(/Not registered?/i));

    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
});
