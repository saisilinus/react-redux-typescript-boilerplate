import React from 'react';
import { Routing } from '../routing';
import { render, screen, waitFor } from '../testing/utils';
import Register from './Register';
import server from '../testing/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Register', () => {
  it('renders correctly', async () => {
    render(<Register />);

    expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
  });

  test('back to login link works', async () => {
    const { user } = render(<Routing />, { route: 'register' });

    await user.click(screen.getByText(/Back to login/i));

    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();
  });

  test('user should be sent to home page after successful registration', async () => {
    const { user } = render(<Routing />, { route: 'register' });

    await user.type(screen.getByTestId('register-name'), 'Some Name');
    await user.type(screen.getByTestId('register-email'), 'john@example.com');
    await user.type(screen.getByTestId('register-password'), 'password1');
    await user.click(screen.getByTestId('register-submit'));

    await waitFor(() => expect(screen.getByText(/Just a simple react bootstrap/i)).toBeInTheDocument());
  });
});
