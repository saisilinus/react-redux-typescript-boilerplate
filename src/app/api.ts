import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { logout } from '../modules/auth/auth.slice';
import { IUserWithTokens } from '../modules/auth/auth.types';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_APIKEY,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
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
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
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
            localStorage.setItem('accessToken', userWithTokens.tokens.access.token);
            localStorage.setItem('refreshToken', userWithTokens.tokens.refresh.token);
            localStorage.setItem('userId', userWithTokens.user.id);
          } else {
            api.dispatch(logout());
          }
        }
      } finally {
        release();
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
