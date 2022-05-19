import React from 'react';
import { render, screen, waitFor } from '../../../../__mocks__/utils';
import { NotFound, Routing } from '..';

describe('Not Found', () => {
  it('renders correctly', () => {
    render(<NotFound />);

    expect(screen.getByText(/Oops! Looks like you followed a bad link/i)).toBeInTheDocument();
  });

  test('home link works', async () => {
    const { user } = render(<Routing />, { route: 'not-found' });

    expect(screen.getByText(/Oops! Looks like you followed a bad link/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Go back home' }));

    await waitFor(() => expect(screen.getByText(/Just a simple react bootstrap template/i)).toBeInTheDocument());
  });
});
