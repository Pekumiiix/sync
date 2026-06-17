import type { IApiResponse } from '@/types/api.type';
import type {
  ICreateNewPasswordPayload,
  IResetPasswordPayload,
  ISignInPayload,
  ISignUpPayload,
  IVerifyEmailPayload
} from '@/types/auth.type';
import type { IUser } from '@/types/user.type';
import { apiClient } from '@/utils/apiUtils';

class AuthService {
  signUp(payload: ISignUpPayload) {
    return apiClient<IApiResponse, ISignUpPayload>('post', '/auth/signup', payload);
  }

  signIn(payload: ISignInPayload) {
    return apiClient<IApiResponse<IUser>, ISignInPayload>('post', '/auth/signin', payload);
  }

  signOut() {
    return apiClient<IApiResponse>('post', '/auth/signout');
  }

  verifyEmail(payload: IVerifyEmailPayload) {
    return apiClient<IApiResponse>('get', '/auth/verify-email', payload);
  }

  forgotPassword(payload: IResetPasswordPayload) {
    return apiClient<IApiResponse, IResetPasswordPayload>('post', '/auth/forgot-password', payload);
  }

  resetPassword(payload: ICreateNewPasswordPayload) {
    return apiClient<IApiResponse, ICreateNewPasswordPayload>(
      'post',
      '/auth/reset-password',
      payload
    );
  }

  currentUser() {
    return apiClient<IApiResponse<IUser>>('get', '/auth/me');
  }
}

export const authService = new AuthService();
