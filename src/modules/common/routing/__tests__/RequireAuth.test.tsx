import React from 'react';
import { render, screen } from '../../../../../__mocks__/utils';
import Routing from '../Routing';

describe('Route Authentication', () => {
  test('correctly load pages that don"t need auth', async () => {
    render(<Routing />);

    expect(
      screen.getByText(/Just a simple react bootstrap template that uses modern redux with redux toolkit/i)
    ).toBeInTheDocument();
  });

  test('redirect pages that need auth to login page', async () => {
    render(<Routing />, { route: '/dashboard' });

    expect(screen.getByText(/Sign in to our platform/i)).toBeInTheDocument();
  });
});
