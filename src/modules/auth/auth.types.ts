export interface IUser {
  id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
}

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

export interface ILoginRequest {
  email: IUser['email'];
  password: string;
}

export type AuthState = {
  user: IUserWithoutPassword | null;
  token: string | null;
};

export interface ILogoutRequest {
  refreshToken: string;
}

export interface IUserWithTokens {
  user: IUserWithoutPassword;
  tokens: AccessAndRefreshTokens;
}
