import React from 'react';
import * as router from 'react-router-dom';
import { Routing } from '../../common/routing';
import { render, screen, waitFor } from '../../../__mocks__/utils';
import VerifyEmail from '../VerifyEmail';
import server from '../../../__mocks__/server';
import NotifyContainer from '../../common/components/Notify';
import routes from '../../common/routing/routes';

const mockRouter = router as unknown as { useSearchParams: () => URLSearchParams[] };

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: null,
  };
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Verify Email', () => {
  it('renders correctly', async () => {
    mockRouter.useSearchParams = () => [new URLSearchParams({ token: 'someToken' })];
    render(<VerifyEmail />);

    expect(screen.getByText(/Verify Your Email/i)).toBeInTheDocument();
  });

  test('back to login link works', async () => {
    mockRouter.useSearchParams = () => [new URLSearchParams({ token: 'someToken' })];
    const { user } = render(<Routing />, { route: routes.VerifyEmail.absolutePath });

    await user.click(screen.getByRole('link', { name: 'Back to login' }));

    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();
  });

  test('displays notification after successful submission', async () => {
    mockRouter.useSearchParams = () => [new URLSearchParams({ token: 'someToken' })];
    const { user } = render(
      <div>
        <NotifyContainer />
        <VerifyEmail />
      </div>
    );

    await user.click(screen.getByRole('button', { name: 'Verify' }));

    await waitFor(() => expect(screen.getByText(/Your email was successfully verified/i)).toBeInTheDocument());
  });

  test('navigates to login page after verification success', async () => {
    mockRouter.useSearchParams = () => [new URLSearchParams({ token: 'someToken' })];
    const { user } = render(<Routing />, { route: routes.VerifyEmail.absolutePath });

    await user.click(screen.getByRole('button', { name: 'Verify' }));

    await waitFor(() => expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument());
  });

  test('notifies user if token is missing', async () => {
    mockRouter.useSearchParams = () => [new URLSearchParams({})];
    const { user } = render(
      <div>
        <NotifyContainer />
        <VerifyEmail />
      </div>
    );

    await user.click(screen.getByRole('button', { name: 'Verify' }));

    await waitFor(() => expect(screen.getByText(/Your token is invalid/i)).toBeInTheDocument());
  });
});
