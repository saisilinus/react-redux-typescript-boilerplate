import React from 'react';
import { render, screen } from '../../../__mocks__/utils';
import Home from './Home';

describe('Home', () => {
  test('render correctly', async () => {
    render(<Home />);

    expect(
      screen.getByText(/Just a simple react bootstrap template that uses modern redux with redux toolkit/i)
    ).toBeInTheDocument();
  });
});
