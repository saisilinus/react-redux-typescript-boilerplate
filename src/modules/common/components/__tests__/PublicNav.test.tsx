import React from 'react';
import { Routing } from '../../routing';
import { render, screen, waitFor } from '../../../../__mocks__/utils';
import PublicNav from '../PublicNav';
import server from '../../../../__mocks__/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Public Header', () => {
  it('renders correctly', async () => {
    render(<PublicNav />);

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  test('dashboard link works', async () => {
    const { user } = render(<Routing />);

    await user.click(screen.getByText(/Dashboard/i));

    await waitFor(() => expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument());
  });
});
