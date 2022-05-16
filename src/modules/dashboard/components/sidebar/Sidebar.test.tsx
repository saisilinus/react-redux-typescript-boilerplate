import React from 'react';
import { render, screen, waitFor } from '../../../testing/utils';
import Sidebar from './Sidebar';
import { Routing } from '../../../routing';
import server from '../../../testing/server';

beforeAll(() => server.listen());

beforeEach(() => {
  window.sessionStorage.clear();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Sidebar', () => {
  it('renders correctly', async () => {
    render(<Sidebar />);

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  });

  test('clicking on a link navigates a user to a page', async () => {
    const { user } = render(<Routing />);

    // login user
    await user.click(screen.getByText(/Dashboard/i));
    await user.type(screen.getByTestId('login-email'), 'john@example.com');
    await user.type(screen.getByTestId('login-password'), 'Some Password');
    await user.click(screen.getByTestId('login-submit'));
    // user redirected to dashboard
    await waitFor(() => expect(screen.getByText(/DashboardHome/i)).toBeInTheDocument());

    // try accessing a page
    await user.click(screen.getByText(/Profile/i));

    await waitFor(() => expect(screen.getByText(/User Details/i)).toBeInTheDocument());
  });
});
