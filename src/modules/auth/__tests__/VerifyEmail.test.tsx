import React from 'react';
import { Routing } from '../../common/routing';
import { render, screen, waitFor } from '../../../../__mocks__/utils';
import VerifyEmail from '../VerifyEmail';
import server from '../../../../__mocks__/server';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: () => [new URLSearchParams({ token: 'someToken' })],
  };
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Verify Email', () => {
  it('renders correctly', async () => {
    render(<VerifyEmail />);

    expect(screen.getByText(/Verify Your Email/i)).toBeInTheDocument();
  });

  test('back to login link works', async () => {
    const { user } = render(<Routing />, { route: 'verify-email' });

    await user.click(screen.getByText(/Back to login/i));

    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();
  });

  test('displays notification after successful submission', async () => {
    const { user } = render(<Routing />, { route: 'verify-email' });

    await user.click(screen.getByTestId('verify-email-submit'));

    await waitFor(() => expect(screen.getByText(/Your email was successfully verified/i)).toBeInTheDocument());
  });

  test('navigates to login page after verification success', async () => {
    const { user } = render(<Routing />, { route: 'verify-email' });

    await user.click(screen.getByTestId('verify-email-submit'));

    await waitFor(() => expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument());
  });
});
