import React from 'react';
import { Routing } from '../../common/routing';
import { render, screen, waitFor } from '../../../__mocks__/utils';
import ForgotPassword from '../ForgotPassword';
import server from '../../../__mocks__/server';
import NotifyContainer from '../../common/components/Notify';
import routes from '../../common/routing/routes';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Forgot Password', () => {
  it('renders correctly', async () => {
    render(<ForgotPassword />);

    expect(screen.getByText(/Enter email to reset password/i)).toBeInTheDocument();
  });

  test('back to login link works', async () => {
    const { user } = render(<Routing />, { route: routes.ForgotPassword.absolutePath });

    await user.click(screen.getByRole('link', { name: 'Back to login' }));

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
    await user.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => expect(screen.getByText(/Please check your email/i)).toBeInTheDocument());
  });
});
