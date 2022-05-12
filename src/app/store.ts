import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
// eslint-disable-next-line import/no-cycle
import api from './api';

// middleware
import { rtkQueryErrorLogger } from '../modules/common/toast/Notify';

// reducers
import userReducer from '../modules/users/users.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
