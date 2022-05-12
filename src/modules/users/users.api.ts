import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import api from '../../app/api';
import { IQueryResults } from '../common/definitions';
import {
  ICreateUserRequest,
  IDeleteUserRequest,
  IGetSingleUserRequest,
  IGetUsersRequestParams,
  IUpdateUserRequest,
  IUser,
  IUserWithoutPassword,
} from './users.types';
import { useAppDispatch } from '../../app/hooks';
import { userIdAdded } from './users.slice';
import { RootState } from '../../app/store';

const apiWithUserTags = api.enhanceEndpoints({ addTagTypes: ['User'] });

const userApi = apiWithUserTags.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<IUserWithoutPassword, ICreateUserRequest>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getUsers: builder.query<IQueryResults<IUserWithoutPassword>, IGetUsersRequestParams>({
      query: (params) => ({
        url: 'users',
        method: 'GET',
        params,
      }),
      providesTags: (data) =>
        data && data.results
          ? [...data.results.map(({ id }) => ({ type: 'User' as const, id })), { type: 'User', id: 'PARTIAL-USER-LIST' }]
          : [{ type: 'User', id: 'PARTIAL-USER-LIST' }],
    }),
    getSingleUser: builder.query<IUserWithoutPassword, IGetSingleUserRequest>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'GET',
      }),
      providesTags: (result) => (result ? [{ type: 'User', id: result.id }] : ['User']),
    }),
    updateUser: builder.mutation<IUserWithoutPassword, IUpdateUserRequest>({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id },
        { type: 'User', id: 'PARTIAL-USER-LIST' },
      ],
    }),
    deleteUser: builder.mutation<void, IDeleteUserRequest>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id },
        { type: 'User', id: 'PARTIAL-USER-LIST' },
      ],
    }),
  }),
});

// Selectors
export const selectUsers = userApi.endpoints.getUsers.select({});
export const selectUserById = (id: IUser['id']) => userApi.endpoints.getSingleUser.select({ id });
export const selectUserFromList = createSelector(
  selectUsers,
  (state: RootState) => state.users,
  (response, userState) => response.data?.results.find((user) => user.id === userState.id)
);

export const getLoggedInUser = (): IUserWithoutPassword | null => {
  let user: IUserWithoutPassword | null = null;
  const id = sessionStorage.getItem('userId') || localStorage.getItem('userId');

  if (id) {
    const selectUser = userApi.endpoints.getSingleUser.select({ id });
    const { data } = useSelector(selectUser);
    if (data) {
      user = data;
    }
  }

  return user;
};

export const getUserFromList = (id: IUser['id']): IUserWithoutPassword | undefined => {
  const dispatch = useAppDispatch();
  dispatch(userIdAdded(id));
  const { data } = useSelector(selectUserById(id));
  // eslint-disable-next-line no-console
  console.log(data);
  return data;
};

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
export default userApi;
