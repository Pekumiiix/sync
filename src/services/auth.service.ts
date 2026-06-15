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
  async signUp(payload: ISignUpPayload) {
    return apiClient<IApiResponse, ISignUpPayload>('post', '/auth/signup', payload);
  }

  async signIn(payload: ISignInPayload) {
    return apiClient<IApiResponse<IUser>, ISignInPayload>('post', '/auth/signin', payload);
  }

  async signOut() {
    return apiClient<IApiResponse>('post', '/auth/signout');
  }

  async verifyEmail(payload: IVerifyEmailPayload) {
    return apiClient<IApiResponse>('get', '/auth/verify-email', payload);
  }

  async forgotPassword(payload: IResetPasswordPayload) {
    return apiClient<IApiResponse, IResetPasswordPayload>('post', '/auth/forgot-password', payload);
  }

  async resetPassword(payload: ICreateNewPasswordPayload) {
    return apiClient<IApiResponse, ICreateNewPasswordPayload>(
      'post',
      '/auth/reset-password',
      payload
    );
  }

  async currentUser() {
    return apiClient<IApiResponse<IUser>>('get', '/auth/me');
  }
}

export const authService = new AuthService();
