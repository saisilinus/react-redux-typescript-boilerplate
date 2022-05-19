import React from 'react';
import { rest } from 'msw';
import { render, screen, waitFor } from '../../../../__mocks__/utils';
import server from '../../../../__mocks__/server';
import { normalUser } from '../../../../__mocks__/data';
import Routing from '../Routing';
import routes from '../routes';

beforeAll(() => server.listen());

beforeEach(() => {
  window.sessionStorage.clear();
  window.localStorage.clear();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Route Authentication', () => {
  test('correctly load pages that don"t need auth', async () => {
    render(<Routing />);

    expect(
      screen.getByText(/Just a simple react bootstrap template that uses modern redux with redux toolkit/i)
    ).toBeInTheDocument();
  });

  test('redirect pages that need auth to login page', async () => {
    render(<Routing />, { route: routes.Dashboard.absolutePath });

    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();
  });

  test('admin should have access to all pages', async () => {
    window.localStorage.setItem('userId', 'someId');
    const { user } = render(<Routing />, { route: routes.Dashboard.absolutePath });

    await waitFor(() => expect(screen.getByText(/DashboardHome/i)).toBeInTheDocument());

    await user.click(screen.getByText(/Users/i));
    expect(screen.getByText(/List/i)).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'List' }));
    await waitFor(() => expect(screen.getByText(/John Smith/i)).toBeInTheDocument());
  });

  test('user access should be forbidden in pages like Users', async () => {
    window.localStorage.setItem('userId', 'someId');
    server.use(
      rest.get(`http://localhost/users/:id`, (req, res, ctx) => {
        return res(ctx.json(normalUser.user), ctx.delay(150));
      })
    );
    render(<Routing />, { route: routes.Dashboard.absolutePath });

    await waitFor(() => expect(screen.getByText(normalUser.user.name)).toBeInTheDocument());
    expect(screen.queryByText(/Users/i)).not.toBeInTheDocument();
  });

  test('normal users should not access forbidden pages', async () => {
    server.use(
      rest.get(`http://localhost/users/:id`, (req, res, ctx) => {
        return res(ctx.json(normalUser.user), ctx.delay(150));
      })
    );
    const { user } = render(<Routing />, { route: routes.UserList.absolutePath });
    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();

    await user.type(screen.getByTestId('login-email'), 'Some Name');
    await user.type(screen.getByTestId('login-password'), 'Some Password');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument());
    expect(screen.queryByText(/Users/i)).not.toBeInTheDocument();
  });
});
