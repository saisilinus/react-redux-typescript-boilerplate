import React from 'react';
import { render, screen, waitFor } from '../../../testing/utils';
import DashNav from './DashNav';
import server from '../../../testing/server';
import { Routing } from '../../../routing';

beforeAll(() => server.listen());

beforeEach(() => {
  window.sessionStorage.clear();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Dashboard Navbar', () => {
  it('renders correctly', async () => {
    render(<DashNav />);

    expect(screen.getByText(/unknown/i)).toBeInTheDocument();
  });

  test('fetches logged in user and displays username', async () => {
    const { user } = render(<Routing />);

    // user tries to access dashboard
    await user.click(screen.getByText(/Dashboard/i));

    // the user is redirected to login page
    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();

    // user logs in
    await user.type(screen.getByTestId('login-email'), 'john@example.com');
    await user.type(screen.getByTestId('login-password'), 'Some Password');
    await user.click(screen.getByTestId('login-submit'));

    // user redirected to dashboard
    await waitFor(() => expect(screen.getByText(/DashboardHome/i)).toBeInTheDocument());

    await waitFor(() => expect(screen.getByText(/Katelynn Morse/i)).toBeInTheDocument());
  });

  test('user dropdown works', async () => {
    const { user } = render(<DashNav />);

    await user.click(screen.getByText(/unknown/i));

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test('logs out user and redirects them to login', async () => {
    const { user } = render(<Routing />);

    // user tries to access dashboard
    await user.click(screen.getByText(/Dashboard/i));

    // the user is redirected to login page
    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();

    // user logs in
    await user.type(screen.getByTestId('login-email'), 'john@example.com');
    await user.type(screen.getByTestId('login-password'), 'Some Password');
    await user.click(screen.getByTestId('login-submit'));

    // user redirected to dashboard
    await waitFor(() => expect(screen.getByText(/DashboardHome/i)).toBeInTheDocument());

    await waitFor(() => expect(screen.getByText(/Katelynn Morse/i)).toBeInTheDocument());

    // user logs out
    await user.click(screen.getByText(/Katelynn Morse/i));
    await user.click(screen.getByText(/Logout/i));

    // user redirected to login
    await waitFor(() => expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument());
  });
});
