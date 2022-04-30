import api from '../../app/api';
import {
  IForgotPasswordRequest,
  ILoginRequest,
  ILogoutRequest,
  IRefreshTokenRequest,
  IRegisterRequest,
  IResetPasswordRequest,
  IUserWithTokens,
  IVerifyEmailRequestParams,
} from './auth.types';

const apiWithAuthTags = api.enhanceEndpoints({ addTagTypes: ['Auth'] });

const authApi = apiWithAuthTags.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUserWithTokens, ILoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation<IUserWithTokens, IRegisterRequest>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation<void, ILogoutRequest>({
      query: (body) => ({
        url: 'auth/logout',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    refreshTokens: builder.mutation<IUserWithTokens, IRefreshTokenRequest>({
      query: (body) => ({
        url: 'auth/refresh-tokens',
        method: 'POST',
        body,
      }),
      extraOptions: { maxRetries: 0 },
      invalidatesTags: ['Auth'],
    }),
    forgotPassword: builder.mutation<void, IForgotPasswordRequest>({
      query: (body) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<void, IResetPasswordRequest>({
      query: ({ body, params }) => ({
        url: 'auth/reset-password',
        method: 'POST',
        body,
        params,
      }),
      invalidatesTags: ['Auth'],
    }),
    sendVerificationEmail: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/send-verification-email',
        method: 'POST',
      }),
    }),
    verifyEmail: builder.mutation<void, IVerifyEmailRequestParams>({
      query: (params) => ({
        url: 'auth/verify-email',
        method: 'POST',
        params,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokensMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSendVerificationEmailMutation,
  useVerifyEmailMutation,
} = authApi;
export default authApi;
