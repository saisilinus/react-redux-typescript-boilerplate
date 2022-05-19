import React from 'react';
import { rest } from 'msw';
import { faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import { render, screen, waitFor } from '../../../../__mocks__/utils';
import Sidebar from './Sidebar';
import { Routing } from '../../../common/routing';
import server from '../../../../__mocks__/server';
import { normalUser } from '../../../../__mocks__/data';
import CollapsibleNavItem from './CollapsibleNavItem';
import routes from '../../../common/routing/routes';
import NavItem from './NavItem';
import restrictions from '../../../common/routing/restrictions';

beforeAll(() => server.listen());

beforeEach(() => {
  window.localStorage.setItem('userId', 'someId');
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Sidebar', () => {
  it('renders correctly', async () => {
    render(<Sidebar />);

    expect(screen.getByText(/Menu/i)).toBeInTheDocument();
  });

  test('clicking on a link navigates a user to a page', async () => {
    const { user } = render(<Routing />, { route: routes.Dashboard.absolutePath });
    await waitFor(() => expect(screen.getByText(/DashboardHome/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/John Paul/i)).toBeInTheDocument());

    // try accessing a page
    await user.click(screen.getByRole('link', { name: 'Profile' }));

    await waitFor(() => expect(screen.getByText(/User Details/i)).toBeInTheDocument());
  });

  test('Collapsible nav items should not be seen by unauthorized users', async () => {
    server.use(
      rest.get(`http://localhost/users/:id`, (req, res, ctx) => {
        return res(ctx.json(normalUser.user), ctx.delay(150));
      })
    );
    render(
      <CollapsibleNavItem
        pathname="http://localhost/dashboard/user-list"
        title="Admin Only"
        eventKey="admin-only"
        icon={faUser}
        restrictedTo={restrictions.admin}
      >
        <div>User List</div>
      </CollapsibleNavItem>
    );
    expect(screen.queryByText(/Admin Only/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/User List/i)).not.toBeInTheDocument();
  });

  test('nav items should not be seen by unauthorized users', async () => {
    server.use(
      rest.get(`http://localhost/users/:id`, (req, res, ctx) => {
        return res(ctx.json(normalUser.user), ctx.delay(150));
      })
    );
    render(
      <NavItem
        pathname="http://localhost/dashboard/user-list"
        link={routes.UserList.absolutePath}
        title="Admin Only"
        icon={faCog}
        restrictedTo={restrictions.admin}
      />
    );
    expect(screen.queryByText(/Admin Only/i)).not.toBeInTheDocument();
  });

  test('Collapsible nav items should be seen by authorized users', async () => {
    render(
      <CollapsibleNavItem
        pathname="http://localhost/dashboard/user-list"
        title="Admin Only"
        eventKey="admin-only"
        icon={faUser}
        restrictedTo={restrictions.admin}
      >
        <div>User List</div>
      </CollapsibleNavItem>
    );
    await waitFor(() => expect(screen.getByText(/Admin Only/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/User List/i)).toBeInTheDocument());
  });

  test('NavItems should be seen by authorized users', async () => {
    render(
      <NavItem
        pathname="http://localhost/dashboard/user-list"
        link={routes.UserList.absolutePath}
        title="Admin Only"
        icon={faCog}
        restrictedTo={restrictions.admin}
      />
    );
    await waitFor(() => expect(screen.getByText(/Admin Only/i)).toBeInTheDocument());
  });
});
