import React from 'react';
import { Routing } from '../../common/routing';
import { render, screen, waitFor } from '../../../__mocks__/utils';
import Register from '../Register';
import server from '../../../__mocks__/server';
import { userWithTokens } from '../../../__mocks__/data';
import routes from '../../common/routing/routes';

jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
jest.spyOn(Object.getPrototypeOf(window.sessionStorage), 'setItem');
jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Register', () => {
  it('renders correctly', async () => {
    render(<Register />);

    expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
  });

  test('back to login link works', async () => {
    const { user } = render(<Routing />, { route: routes.Register.absolutePath });

    await user.click(screen.getByRole('link', { name: 'Back to login' }));

    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();
  });

  test('user should be sent to home page after successful registration', async () => {
    const { user } = render(<Routing />, { route: routes.Register.absolutePath });

    await user.type(screen.getByTestId('register-name'), 'Some Name');
    await user.type(screen.getByTestId('register-email'), 'john@example.com');
    await user.type(screen.getByTestId('register-password'), 'password1');
    await user.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => expect(screen.getByText(/Just a simple react bootstrap/i)).toBeInTheDocument());
  });

  test('remember me should be false by default', async () => {
    render(<Register />);

    expect(localStorage.setItem).toHaveBeenCalledWith('rememberMe', 'false');
    expect(localStorage.setItem).not.toHaveBeenCalledWith('rememberMe', 'true');
  });

  test('remember me button works', async () => {
    const { user } = render(<Register />);

    expect(localStorage.setItem).toHaveBeenCalledWith('rememberMe', 'false');

    await user.click(screen.getByRole('checkbox', { name: 'Remember me' }));

    expect(localStorage.setItem).toHaveBeenCalledWith('rememberMe', 'true');
  });

  test('registered user details are stored in session storage by default', async () => {
    const { user } = render(<Register />);

    await user.type(screen.getByTestId('register-name'), 'Some Name');
    await user.type(screen.getByTestId('register-email'), 'john@example.com');
    await user.type(screen.getByTestId('register-password'), 'password1');
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(localStorage.getItem).toBeCalledWith('rememberMe');

    await waitFor(() => expect(sessionStorage.setItem).toBeCalledWith('userId', userWithTokens.user.id));
    await waitFor(() => expect(sessionStorage.setItem).toBeCalledWith('accessToken', userWithTokens.tokens.access.token));
    await waitFor(() => expect(sessionStorage.setItem).toBeCalledWith('refreshToken', userWithTokens.tokens.refresh.token));
  });

  test('registered user details are stored in local storage if the select remember me', async () => {
    const { user } = render(<Register />);

    await user.type(screen.getByTestId('register-name'), 'Some Name');
    await user.type(screen.getByTestId('register-email'), 'john@example.com');
    await user.type(screen.getByTestId('register-password'), 'password1');
    await user.click(screen.getByRole('checkbox', { name: 'Remember me' }));
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(localStorage.getItem).toBeCalledWith('rememberMe');

    await waitFor(() => expect(localStorage.setItem).toBeCalledWith('userId', userWithTokens.user.id));
    await waitFor(() => expect(localStorage.setItem).toBeCalledWith('accessToken', userWithTokens.tokens.access.token));
    await waitFor(() => expect(localStorage.setItem).toBeCalledWith('refreshToken', userWithTokens.tokens.refresh.token));
  });
});
