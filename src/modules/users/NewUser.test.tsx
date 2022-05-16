import React from 'react';
import { render, screen, waitFor } from '../testing/utils';
import NewUser from './NewUser';
import server from '../testing/server';
import NotifyContainer from '../common/toast/Notify';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Users', () => {
  it('renders correctly', async () => {
    render(<NewUser />);

    expect(screen.getByText(/User Details/i)).toBeInTheDocument();
  });

  test('creates a user and toasts notification on success', async () => {
    const { user } = render(
      <div>
        <NotifyContainer />
        <NewUser />
      </div>
    );

    await user.type(screen.getByTestId('newUser-firstName'), 'curtis');
    await user.type(screen.getByTestId('newUser-lastName'), 'jackson');
    await user.click(screen.getByTestId('newUser-role'));
    await user.click(screen.getByTestId('newUser-role-user'));
    await user.type(screen.getByTestId('newUser-email'), 'jackson@gmail.com');
    await user.type(screen.getByTestId('newUser-password'), 'jackson123');
    await user.click(screen.getByTestId('newUser-submit'));

    await waitFor(() => expect(screen.getByText(/has been successfully registered/i)).toBeInTheDocument());
  });
});
