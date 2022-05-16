import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { users, userWithTokens, queryResult } from './data';

const baseUrl = 'http://localhost/';
const dashUrl = 'http://localhost/dashboard/';

export const handlers = [
  rest.post(`${baseUrl}auth/login`, (req, res, ctx) => {
    return res(ctx.json(userWithTokens), ctx.delay(150));
  }),
  rest.post(`${baseUrl}auth/register`, (req, res, ctx) => {
    return res(ctx.json(userWithTokens), ctx.delay(150));
  }),
  rest.post(`${baseUrl}auth/logout`, (req, res, ctx) => {
    return res(ctx.status(204), ctx.delay(150));
  }),
  rest.post(`${baseUrl}auth/refresh-tokens`, (req, res, ctx) => {
    return res(ctx.json(userWithTokens), ctx.delay(150));
  }),
  rest.post(`${baseUrl}auth/forgot-password`, (req, res, ctx) => {
    return res(ctx.status(204), ctx.delay(150));
  }),
  rest.post(`${baseUrl}auth/reset-password`, (req, res, ctx) => {
    return res(ctx.status(204), ctx.delay(150));
  }),
  rest.post(`${baseUrl}auth/send-verification-email`, (req, res, ctx) => {
    return res(ctx.status(204), ctx.delay(150));
  }),
  rest.post(`${baseUrl}auth/verify-email`, (req, res, ctx) => {
    return res(ctx.status(204), ctx.delay(150));
  }),
  rest.post(`${baseUrl}users`, (req, res, ctx) => {
    return res(ctx.json(users[7]), ctx.delay(150));
  }),
  rest.post(`${dashUrl}users`, (req, res, ctx) => {
    return res(ctx.json(users[7]), ctx.delay(150));
  }),
  rest.get(`${baseUrl}users`, (req, res, ctx) => {
    return res(ctx.json(queryResult), ctx.delay(150));
  }),
  rest.get(`${dashUrl}users`, (req, res, ctx) => {
    return res(ctx.json(queryResult), ctx.delay(150));
  }),
  rest.get(`${baseUrl}users/:id`, (req, res, ctx) => {
    return res(ctx.json(users[8]), ctx.delay(150));
  }),
  rest.get(`${dashUrl}users/:id`, (req, res, ctx) => {
    return res(ctx.json(users[8]), ctx.delay(150));
  }),
  rest.patch(`${baseUrl}users/:id`, (req, res, ctx) => {
    return res(ctx.json(users[9]), ctx.delay(150));
  }),
  rest.patch(`${dashUrl}users/:id`, (req, res, ctx) => {
    return res(ctx.json(users[9]), ctx.delay(150));
  }),
  rest.delete(`${baseUrl}users/:id`, (req, res, ctx) => {
    return res(ctx.status(204), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

export default server;
