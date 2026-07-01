import type { IApiResponse } from '@/types/api.type';
import type {
  IAuthResponse,
  ICreateNewPasswordPayload,
  IResendVerificationEmailPayload,
  IResetPasswordPayload,
  ISignInPayload,
  ISignUpPayload,
  IVerifyEmailPayload
} from '@/types/auth.type';
import { apiClient } from '@/utils/apiUtils';

class AuthService {
  signUp(payload: ISignUpPayload) {
    return apiClient<IApiResponse<IAuthResponse>, ISignUpPayload>('post', '/auth/sign-up', payload);
  }

  signIn(payload: ISignInPayload) {
    return apiClient<IApiResponse<IAuthResponse>, ISignInPayload>('post', '/auth/sign-in', payload);
  }

  signOut() {
    return apiClient<IApiResponse>('post', '/auth/sign-out');
  }

  verifyEmail(payload: IVerifyEmailPayload) {
    return apiClient<IApiResponse>('post', '/auth/verify-email', payload);
  }

  resendVerificationEmail(payload: IResendVerificationEmailPayload) {
    return apiClient<IApiResponse>('post', '/auth/verify-email/resend', payload);
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
}

export const authService = new AuthService();
