import React from 'react';
import * as router from 'react-router-dom';
import { render, screen, waitFor } from '../../../__mocks__/utils';
import EditUser from '../EditUser';
import server from '../../../__mocks__/server';
import NotifyContainer from '../../common/components/Notify';

const mockRouter = router as unknown as { useParams: () => Record<string, string> };

const mockParams: Record<string, string> = { id: 'someId' };

const fakeParams: Record<string, string> = { fakeParam: 'someId' };

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useParams: null,
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
    mockRouter.useParams = () => mockParams;
    render(<EditUser />);

    expect(screen.getByText(/No User Found/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/First Name/i)).toBeInTheDocument());
  });

  test('updates user and toasts notification', async () => {
    mockRouter.useParams = () => mockParams;
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
    await user.type(screen.getByTestId('editUser-email'), 'jackson@yahoo.com');
    await user.type(screen.getByTestId('editUser-password'), 'jackson123');
    await user.click(screen.getByRole('button', { name: 'Update' }));

    await waitFor(() => expect(screen.getByText(/has been successfully updated/i)).toBeInTheDocument());
  });

  test('renders "No User Found" if there is no data', async () => {
    mockRouter.useParams = () => fakeParams;
    render(<EditUser />);

    expect(screen.getByText(/No User Found/i)).toBeInTheDocument();
  });
});
