import React from 'react';
import { render, screen } from '../../../../__mocks__/utils';
import Routing from '../Routing';

describe('Navigation', () => {
  test('full app rendering/navigating', async () => {
    const { user } = render(<Routing />);

    expect(
      screen.getByText(/Just a simple react bootstrap template that uses modern redux with redux toolkit/i)
    ).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Dashboard' }));

    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();
  });

  test('landing on a bad page', async () => {
    render(<Routing />, { route: '/something-that-does-not-match' });

    expect(
      screen.getByText(/Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us/i)
    ).toBeInTheDocument();
  });
});
