import React from 'react';
import { render, screen } from '../../../../testUtils/utils';
import Footer from './Footer';

describe('Footer', () => {
  it('renders correctly', async () => {
    render(<Footer />);

    expect(screen.getByText(/Copyright ©/i)).toBeInTheDocument();
  });
});
