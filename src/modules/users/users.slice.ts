/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './users.types';

type UserState = {
  id: IUser['id'] | null;
};

const initialState: UserState = { id: null };

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userIdAdded(state, action: PayloadAction<IUser['id']>) {
      state.id = action.payload;
    },
  },
});

export const { userIdAdded } = userSlice.actions;

export default userSlice.reducer;
