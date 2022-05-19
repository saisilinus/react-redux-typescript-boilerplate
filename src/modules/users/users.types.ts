import IDoc from '../common/definitions/IDoc';
import IQueryFilter from '../common/definitions/IQueryFilter';

export interface IUser extends IDoc {
  id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
}

export type IUserWithoutPassword = Omit<IUser, 'password'>;

export type ICreateUserRequest = Omit<IUser, 'id' | 'isEmailVerified'>;

export type IUserFilterFields = Pick<IUser, 'name' | 'role'>;

export type IGetUsersRequestParams = Partial<IUserFilterFields & IQueryFilter>;

export type IGetSingleUserRequest = Pick<IUser, 'id'>;

export type UserUpdateFields = Omit<IUser, 'id' | 'role' | 'isEmailVerified'>;

export interface IUpdateUserRequest {
  id: IUser['id'];
  body: Partial<UserUpdateFields>;
}

export type IDeleteUserRequest = Pick<IUser, 'id'>;
