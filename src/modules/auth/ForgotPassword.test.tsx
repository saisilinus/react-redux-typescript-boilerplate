import React from 'react';
import { Routing } from '../routing';
import { render, screen, waitFor } from '../testing/utils';
import ForgotPassword from './ForgotPassword';
import server from '../testing/server';
import NotifyContainer from '../common/toast/Notify';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Forgot Password', () => {
  it('renders correctly', async () => {
    render(<ForgotPassword />);

    expect(screen.getByText(/Enter email to reset password/i)).toBeInTheDocument();
  });

  test('back to login link works', async () => {
    const { user } = render(<Routing />, { route: 'forgot-password' });

    await user.click(screen.getByText(/Back to login/i));

    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();
  });

  test('displays email sent notification after successful submission', async () => {
    const { user } = render(
      <div>
        <NotifyContainer />
        <ForgotPassword />
      </div>
    );

    await user.type(screen.getByTestId('forgot-password-email'), 'john@example.com');
    await user.click(screen.getByTestId('forgot-password-submit'));

    await waitFor(() => expect(screen.getByText(/Please check your email/i)).toBeInTheDocument());
  });
});
