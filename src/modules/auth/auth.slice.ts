/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { AuthState, IUserWithTokens } from './auth.types';
// eslint-disable-next-line import/no-cycle
import authApi from './auth.api';

const initialState = { user: null, token: null } as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, tokens } }: PayloadAction<IUserWithTokens>) => {
      state.user = user;
      state.token = tokens.access.token;
      localStorage.setItem('refreshToken', tokens.refresh.token);
    },
    logout: (state) => {
      state.user = initialState.user;
      state.token = initialState.token;
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.tokens.access.token;
      localStorage.setItem('refreshToken', payload.tokens.refresh.token);
    });
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.tokens.access.token;
      localStorage.setItem('refreshToken', payload.tokens.refresh.token);
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.user = initialState.user;
      state.token = initialState.token;
      localStorage.removeItem('refreshToken');
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
