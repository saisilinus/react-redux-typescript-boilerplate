import React from 'react';
import { render, screen, waitFor } from '../../../../__mocks__/utils';
import Profile from './Profile';
import server from '../../../../__mocks__/server';
import { Routing } from '../../../common/routing';
import routes from '../../../common/routing/routes';

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
    window.localStorage.setItem('userId', 'someId');
    const { user } = render(<Routing />, { route: routes.Profile.absolutePath });
    await waitFor(() => expect(screen.getByText(/User Details/i)).toBeInTheDocument());

    // input updates and submit
    await user.type(screen.getByTestId('profile-firstName'), 'curtis');
    await user.type(screen.getByTestId('profile-lastName'), 'jackson');
    await user.type(screen.getByTestId('profile-email'), 'jackson@yahoo.com');
    await user.type(screen.getByTestId('profile-password'), '#curtis@456');
    await user.click(screen.getByRole('button', { name: 'Update' }));

    await waitFor(() => expect(screen.getByText(/has been successfully updated/i)).toBeInTheDocument());
  });
});
