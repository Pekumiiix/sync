import type { IUser } from './user.type';

// Request payloads for authentication-related operations
export interface ISignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ISignInPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface IResetPasswordPayload {
  email: string;
}

export interface ICreateNewPasswordPayload {
  token: string;
  password: string;
}

export interface IVerifyEmailPayload {
  token: string;
}

export interface IResendVerificationEmailPayload {
  email: string;
}

// Response objects for authentication-related operations
export interface IAuthResponse {
  user: IUser;
  token: string;
}
