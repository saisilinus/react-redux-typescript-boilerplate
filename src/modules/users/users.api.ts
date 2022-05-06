import { useSelector } from 'react-redux';
import api from '../../app/api';
import {
  ICreateUserRequest,
  IDeleteUserRequest,
  IGetSingleUserRequest,
  IGetUsersRequestParams,
  IUpdateUserRequest,
  IUserQueryResults,
  IUserWithoutPassword,
} from './users.types';

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
    getUsers: builder.query<IUserQueryResults, IGetUsersRequestParams>({
      query: (params) => ({
        url: 'users',
        method: 'GET',
        params,
      }),
      providesTags: (data) =>
        data && data.results ? [...data.results.map(({ id }) => ({ type: 'User' as const, id })), 'User'] : ['User'],
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
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
    deleteUser: builder.mutation<void, IDeleteUserRequest>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
  }),
});

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

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
export default userApi;
