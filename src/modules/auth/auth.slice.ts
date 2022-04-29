/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { AuthState, IUserWithTokens } from './auth.types';

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
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
