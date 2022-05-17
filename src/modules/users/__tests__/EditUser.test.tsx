import React from 'react';
import { render, screen, waitFor } from '../../../../__mocks__/utils';
import EditUser from '../EditUser';
import server from '../../../../__mocks__/server';
import NotifyContainer from '../../common/components/Notify';

const mockParams = { id: 'someId' };

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useParams: () => mockParams,
  };
});

beforeAll(() => server.listen());

beforeEach(() => {
  window.sessionStorage.clear();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Edit User', () => {
  it('renders correctly', async () => {
    render(<EditUser />);

    expect(screen.getByText(/No User Found/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/First Name/i)).toBeInTheDocument());
  });

  test('updates user and toasts notification', async () => {
    const { user } = render(
      <div>
        <NotifyContainer />
        <EditUser />
      </div>
    );

    await waitFor(() => expect(screen.getByText(/First Name/i)).toBeInTheDocument());
    // input updates and submit
    await user.type(screen.getByTestId('editUser-firstName'), 'curtis');
    await user.type(screen.getByTestId('editUser-lastName'), 'jackson');
    await user.click(screen.getByTestId('editUser-submit'));

    await waitFor(() => expect(screen.getByText(/has been successfully updated/i)).toBeInTheDocument());
  });
});
