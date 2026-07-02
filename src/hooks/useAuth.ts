import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { authService } from '@/services/auth.service';
import type {
  ICreateNewPasswordPayload,
  IResetPasswordPayload,
  ISignInPayload,
  ISignUpPayload,
  IVerifyEmailPayload
} from '@/types/auth.type';
import { toaster } from '@/utils/toastUtils';

export function useSignUp() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ISignUpPayload) => authService.signUp(payload),
    onSuccess: (response) => {
      queryClient.setQueryData(QUERY_KEYS.auth.currentUser(), response.data.user);

      localStorage.setItem('auth_token', response.data.token);

      router.push('/auth/verify-email');
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ISignInPayload) => authService.signIn(payload),
    onSuccess: (response) => {
      queryClient.setQueryData(QUERY_KEYS.auth.currentUser(), response.data.user);

      localStorage.setItem('auth_token', response.data.token);

      const redirectPath = router.currentRoute.value.query.redirect as string;

      router.replace(redirectPath || '/app/all-bookmarks');
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.signOut(),
    onSettled: () => {
      queryClient.clear();

      toaster.success('You have been signed out.');

      router.push('/auth/sign-in');
    }
  });
}

export function useVerifyEmail() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: IVerifyEmailPayload) => authService.verifyEmail(payload),
    onSuccess: () => {
      toaster.success('Email verified successfully.');

      router.push('/app/all-bookmarks');
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

export function useForgotPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: IResetPasswordPayload) => authService.forgotPassword(payload),
    onSuccess: () => {
      router.push('/auth/reset-password');
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ICreateNewPasswordPayload) => authService.resetPassword(payload),
    onSuccess: (response) => {
      toaster.success(response.message);

      router.push('/auth/sign-in');
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

export function useResendVerificationEmail() {
  return useMutation({
    mutationFn: (payload: { email: string }) => authService.resendVerificationEmail(payload),
    onSuccess: (response) => {
      toaster.success(response.message);
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}
