import React from 'react';
import { render, screen, waitFor } from '../../../__mocks__/utils';
import UserList from '../UserList';
import server from '../../../__mocks__/server';
import { Routing } from '../../common/routing';
import routes from '../../common/routing/routes';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Users', () => {
  it('renders correctly', async () => {
    render(<UserList />);

    expect(screen.getByText(/No Users/i)).toBeInTheDocument();
  });

  test('users are fetched and paginated in a list', async () => {
    render(<UserList />);

    expect(screen.getByText(/No Users/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Users List/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/John Paul/i)).toBeInTheDocument());
  });

  test('paginates users according to set options', async () => {
    render(<UserList />);

    expect(screen.getByText(/No Users/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/John Paul/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(/Bradley Saisi/i)).not.toBeInTheDocument());
  });

  test('Add New User link works', async () => {
    window.localStorage.setItem('userId', 'someId');
    const { user } = render(<Routing />, { route: routes.UserList.absolutePath });

    await waitFor(() => expect(screen.getByText(/No Users/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/John Paul/i)).toBeInTheDocument());

    await waitFor(() => expect(screen.getByText(/Users List/i)).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Add New User' }));
    await waitFor(() => expect(screen.getByText(/User Details/i)).toBeInTheDocument());
  });
});
