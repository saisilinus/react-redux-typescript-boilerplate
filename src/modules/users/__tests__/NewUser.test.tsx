import React from 'react';
import { render, screen, waitFor } from '../../../__mocks__/utils';
import NewUser from '../NewUser';
import server from '../../../__mocks__/server';
import NotifyContainer from '../../common/components/Notify';

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
    await user.click(screen.getByRole('option', { name: 'User' }));
    await user.type(screen.getByTestId('newUser-email'), 'jackson@gmail.com');
    await user.type(screen.getByTestId('newUser-password'), 'jackson123');
    await user.click(screen.getByRole('button', { name: 'Create' }));

    await waitFor(() => expect(screen.getByText(/has been successfully registered/i)).toBeInTheDocument());
  });
});
