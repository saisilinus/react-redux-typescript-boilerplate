import { IUserWithoutPassword } from '../users/users.types';
import { IUserWithTokens } from '../auth/auth.types';
import IQueryResult from '../common/definitions/IQueryResults';

export const users: IUserWithoutPassword[] = [
  {
    id: '1',
    name: 'John Paul',
    role: 'admin',
    email: 'johnpaul@gmail.com',
    isEmailVerified: true,
  },
  {
    id: '2',
    name: 'John Smith',
    role: 'user',
    email: 'johnsmith@gmail.com',
    isEmailVerified: true,
  },
  {
    id: '3',
    name: 'Jessica Parker',
    role: 'admin',
    email: 'jessicaP@gmail.com',
    isEmailVerified: true,
  },
  {
    id: '4',
    name: 'Joann Osinski',
    role: 'user',
    email: 'joann@gmail.com',
    isEmailVerified: false,
  },
  {
    id: '5',
    name: 'Marcella Huels',
    role: 'user',
    email: 'marcella@gmail.com',
    isEmailVerified: false,
  },
  {
    id: '6',
    name: 'Alfonso Beer',
    role: 'user',
    email: 'alfonso@gmail.com',
    isEmailVerified: true,
  },
  {
    id: '7',
    name: 'Victoria Beckham',
    role: 'user',
    email: 'victoria@gmail.com',
    isEmailVerified: true,
  },
  {
    id: '8',
    name: 'Tom Hardy',
    role: 'admin',
    email: 'tom@gmail.com',
    isEmailVerified: true,
  },
  {
    id: '9',
    name: 'Katelynn Morse',
    role: 'user',
    email: 'katelynn@gmail.com',
    isEmailVerified: false,
  },
  {
    id: '10',
    name: 'Kelvin Sporer',
    role: 'user',
    email: 'kelvin@gmail.com',
    isEmailVerified: false,
  },
];

export const userWithTokens: IUserWithTokens = {
  user: users[0],
  tokens: {
    access: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg',
      expires: '2022-07-12T16:18:04.793Z',
    },
    refresh: {
      token:
        'ezGhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXBg',
      expires: '2022-08-12T16:18:04.793Z',
    },
  },
};

export const queryResult: IQueryResult<IUserWithoutPassword> = {
  results: users,
  limit: users.length,
  totalPages: 1,
  totalResults: users.length,
  page: 1,
};
