import React from 'react';
import { rest } from 'msw';
import { render, screen } from '../../../../__mocks__/utils';
import server from '../../../../__mocks__/server';
import { IErrorResponse } from '../../definitions';
import { Login } from '../../../auth';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const exampleErrorResponse: IErrorResponse = { code: 500, message: 'Incorrect email or password' };

describe('Notify', () => {
  it('notifies user in case of server error', async () => {
    server.use(
      // override login request to return error
      rest.post(`http://localhost/auth/login`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(exampleErrorResponse), ctx.delay(150));
      })
    );
    const { user } = render(<Login />);

    try {
      await user.type(screen.getByTestId('login-email'), 'Some Name');
      await user.type(screen.getByTestId('login-password'), 'Some Password');
      await user.click(screen.getByRole('button', { name: 'Sign in' }));
    } catch (e: any) {
      expect(e.message).toBe(exampleErrorResponse.message);
    }
  });
});
