import React from 'react';
import { render, screen, waitFor } from '../testing/utils';
import UserList from './UserList';
import server from '../testing/server';

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
});
