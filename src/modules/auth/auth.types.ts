import { IUser } from '../users/users.types';

export type IRegisterRequest = Omit<IUser, 'id' | 'isEmailVerified' | 'role'>;

export type IUserWithoutPassword = Omit<IUser, 'password'>;

export interface ITokenPayload {
  token: string;
  expires: string;
}

export interface AccessAndRefreshTokens {
  access: ITokenPayload;
  refresh: ITokenPayload;
}

export interface ILoginResponse {
  user: IUserWithoutPassword;
  tokens: AccessAndRefreshTokens;
}

export interface IRegisterResponse {
  user: IUserWithoutPassword;
  tokens: AccessAndRefreshTokens;
}

export type ILoginRequest = Pick<IUser, 'email' | 'password'>;

export type AuthState = {
  user: IUserWithoutPassword | null;
  token: ITokenPayload['token'] | null;
};

export interface ILogoutRequest {
  refreshToken: ITokenPayload['token'];
}

export interface IUserWithTokens {
  user: IUserWithoutPassword;
  tokens: AccessAndRefreshTokens;
}

export interface IRefreshTokenRequest {
  refreshToken: ITokenPayload['token'];
}

export type IForgotPasswordRequest = Pick<IUser, 'email'>;

export type IResetPasswordRequestBody = Pick<IUser, 'password'>;

export type IResetPasswordRequestParams = Pick<ITokenPayload, 'token'>;

export interface IResetPasswordRequest {
  body: IResetPasswordRequestBody;
  params: IResetPasswordRequestParams;
}

export type IVerifyEmailRequestParams = Pick<ITokenPayload, 'token'>;
