import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
// eslint-disable-next-line import/no-cycle
import { RootState } from './store';
import { logout, setCredentials } from '../modules/auth/auth.slice';
import { IUserWithTokens } from '../modules/auth/auth.types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000/v1/',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      // try to get a new token
      const refreshResult = await baseQuery(
        {
          url: 'auth/refresh-tokens',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );
      if (refreshResult.data) {
        const userWithTokens = refreshResult.data as IUserWithTokens;
        api.dispatch(setCredentials(userWithTokens));
        // store the new refresh token
        localStorage.setItem('refreshToken', userWithTokens.tokens.refresh.token);
      } else {
        api.dispatch(logout());
      }
    }
    // retry the initial query
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

const api = createApi({
  reducerPath: 'rootApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export default api;
