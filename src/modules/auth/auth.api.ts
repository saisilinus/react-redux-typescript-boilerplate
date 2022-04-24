import api from '../../app/api';
import { ILoginRequest, ILogoutRequest, IRegisterRequest, IUserWithTokens } from './auth.types';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUserWithTokens, ILoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<IUserWithTokens, IRegisterRequest>({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: builder.mutation<void, ILogoutRequest>({
      query: (logoutData) => ({
        url: 'auth/logout',
        method: 'POST',
        body: logoutData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
