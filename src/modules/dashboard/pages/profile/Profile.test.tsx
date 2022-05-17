import React from 'react';
import { render, screen, waitFor } from '../../../../../__mocks__/utils';
import Profile from './Profile';
import server from '../../../../../__mocks__/server';
import { Routing } from '../../../common/routing';

beforeAll(() => server.listen());

beforeEach(() => {
  window.sessionStorage.clear();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Dashboard Overview', () => {
  it('renders correctly', async () => {
    render(<Profile />);

    expect(screen.getByText(/No User Found/i)).toBeInTheDocument();
  });

  test('updates user profile and sends notification', async () => {
    const { user } = render(<Routing />, { route: '/dashboard/profile' });

    // login user so that userId is saved in localStorage
    // await user.click(screen.getByText(/Dashboard/i));
    await user.type(screen.getByTestId('login-email'), 'john@example.com');
    await user.type(screen.getByTestId('login-password'), 'Some Password');
    await user.click(screen.getByTestId('login-submit'));
    // user redirected to profile
    await waitFor(() => expect(screen.getByText(/User Details/i)).toBeInTheDocument());

    // input updates and submit
    await user.type(screen.getByTestId('profile-firstName'), 'curtis');
    await user.type(screen.getByTestId('profile-lastName'), 'jackson');
    await user.click(screen.getByTestId('profile-submit'));

    await waitFor(() => expect(screen.getByText(/has been successfully updated/i)).toBeInTheDocument());
  });
});
