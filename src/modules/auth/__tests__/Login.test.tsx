import React from 'react';
import { render, screen, waitFor } from '../../../__mocks__/utils';
import Login from '../Login';
import server from '../../../__mocks__/server';
import { userWithTokens } from '../../../__mocks__/data';
import { Routing } from '../../common/routing';
import routes from '../../common/routing/routes';

jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
jest.spyOn(Object.getPrototypeOf(window.sessionStorage), 'setItem');

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Login', () => {
  test('render correctly', async () => {
    render(<Login />);

    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();
  });

  test('logs in user and stores their details in session storage', async () => {
    const { user } = render(<Routing />, { route: routes.Login.absolutePath });

    await user.type(screen.getByTestId('login-email'), 'Some Name');
    await user.type(screen.getByTestId('login-password'), 'Some Password');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(localStorage.setItem).toHaveBeenCalledWith('rememberMe', 'false');
    await waitFor(() => expect(sessionStorage.setItem).toBeCalledWith('userId', userWithTokens.user.id));
    await waitFor(() => expect(sessionStorage.setItem).toBeCalledWith('accessToken', userWithTokens.tokens.access.token));
    await waitFor(() => expect(sessionStorage.setItem).toBeCalledWith('refreshToken', userWithTokens.tokens.refresh.token));
  });

  test('redirects to home page after login', async () => {
    const { user } = render(<Routing />, { route: routes.Login.absolutePath });

    await user.type(screen.getByTestId('login-email'), 'Some Name');
    await user.type(screen.getByTestId('login-password'), 'Some Password');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => expect(screen.getByText(/Just a simple react bootstrap/i)).toBeInTheDocument());
  });

  test('back home link works', async () => {
    const { user } = render(<Routing />, { route: routes.Login.absolutePath });

    await user.click(screen.getByRole('link', { name: 'Back to homepage' }));

    expect(screen.getByText(/Just a simple react bootstrap/i)).toBeInTheDocument();
  });

  test('lost password link works', async () => {
    const { user } = render(<Routing />, { route: routes.Login.absolutePath });

    await user.click(screen.getByRole('link', { name: 'Lost password?' }));

    expect(screen.getByText(/Enter email to reset password/i)).toBeInTheDocument();
  });

  test('register link works', async () => {
    const { user } = render(<Routing />, { route: routes.Login.absolutePath });

    await user.click(screen.getByRole('link', { name: 'Create account' }));

    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test('remember me should be false by default', async () => {
    render(<Login />);

    expect(localStorage.setItem).toHaveBeenCalledWith('rememberMe', 'false');
    expect(localStorage.setItem).not.toHaveBeenCalledWith('rememberMe', 'true');
  });

  test('remember me checkbox works', async () => {
    const { user } = render(<Login />);

    await user.click(screen.getByRole('checkbox', { name: 'Remember me' }));

    expect(localStorage.setItem).toHaveBeenCalledWith('rememberMe', 'true');

    await user.click(screen.getByRole('checkbox', { name: 'Remember me' }));

    expect(localStorage.setItem).toHaveBeenCalledWith('rememberMe', 'false');

    await user.click(screen.getByRole('checkbox', { name: 'Remember me' }));
    expect(localStorage.setItem).toHaveBeenCalledWith('rememberMe', 'true');
    await user.type(screen.getByTestId('login-email'), 'Some Name');
    await user.type(screen.getByTestId('login-password'), 'Some Password');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => expect(localStorage.setItem).toBeCalledWith('userId', userWithTokens.user.id));
    await waitFor(() => expect(localStorage.setItem).toBeCalledWith('accessToken', userWithTokens.tokens.access.token));
    await waitFor(() => expect(localStorage.setItem).toBeCalledWith('refreshToken', userWithTokens.tokens.refresh.token));
  });
});
