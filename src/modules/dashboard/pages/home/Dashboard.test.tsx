import React from 'react';
import { render, screen } from '../../../../__mocks__/utils';
import DashboardHome from './DashboardHome';

describe('Dashboard Overview', () => {
  it('renders correctly', async () => {
    render(<DashboardHome />);

    expect(screen.getByText(/DashboardHome/i)).toBeInTheDocument();
  });
});
