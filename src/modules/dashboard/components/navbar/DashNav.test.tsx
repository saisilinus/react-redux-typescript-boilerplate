import React from 'react';
import { render, screen, waitFor } from '../../../../__mocks__/utils';
import DashNav from './DashNav';
import server from '../../../../__mocks__/server';
import { Routing } from '../../../common/routing';
import { admin } from '../../../../__mocks__/data';
import routes from '../../../common/routing/routes';
import NotifyContainer from '../../../common/components/Notify';

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
    window.localStorage.setItem('userId', 'someId');
    render(<DashNav />);

    await waitFor(() => expect(screen.getByText(admin.user.name)).toBeInTheDocument());
  });

  test('user dropdown works', async () => {
    const { user } = render(<DashNav />);

    await user.click(screen.getByRole('button', { name: 'unknown' }));

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test('logs out user and redirects them to login', async () => {
    window.localStorage.setItem('userId', 'someId');
    window.localStorage.setItem('refreshToken', 'someToken');
    const { user } = render(<Routing />, { route: routes.Dashboard.absolutePath });

    await waitFor(() => expect(screen.getByText(admin.user.name)).toBeInTheDocument());

    // user logs out
    await user.click(screen.getByText(admin.user.name));
    await user.click(screen.getByRole('button', { name: 'Logout' }));

    // user redirected to login
    await waitFor(() => expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument());
  });

  test('user should get notification if they try to logout while not logged in', async () => {
    window.localStorage.setItem('userId', 'someId');
    const { user } = render(
      <div>
        <NotifyContainer />
        <DashNav />
      </div>
    );

    await waitFor(() => expect(screen.getByText(admin.user.name)).toBeInTheDocument());

    // user logs out
    await user.click(screen.getByText(admin.user.name));
    await user.click(screen.getByRole('button', { name: 'Logout' }));

    // Notification
    await waitFor(() => expect(screen.getByText(/You have to be logged in to log out/i)).toBeInTheDocument());
  });
});
