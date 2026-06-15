export interface ISignUpPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface IResetPasswordPayload {
  email: string;
}

export interface ICreateNewPasswordPayload {
  token: string;
  new_password: string;
}

export interface IVerifyEmailPayload {
  token: string;
}
