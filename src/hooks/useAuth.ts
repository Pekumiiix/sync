import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
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
      const authStore = useAuthStore();

      queryClient.setQueryData(QUERY_KEYS.auth.currentUser(), {
        data: { user: response.data.user }
      });

      localStorage.setItem('auth_token', response.data.token);

      authStore.setCredentials(response.data.token);

      router.push({ name: 'Verify Email' });
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
      const authStore = useAuthStore();

      queryClient.setQueryData(QUERY_KEYS.auth.currentUser(), {
        data: { user: response.data.user }
      });

      localStorage.setItem('auth_token', response.data.token);
      authStore.setCredentials(response.data.token);

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
      const authStore = useAuthStore();

      queryClient.clear();

      authStore.clearCredentials();

      toaster.success('You have been signed out.');

      router.push('/auth/sign-in');
    }
  });
}

export function useVerifyEmail() {
  const router = useRouter();

  const { refetchCurrentUser } = useAuthStore();

  return useMutation({
    mutationFn: (payload: IVerifyEmailPayload) => authService.verifyEmail(payload),
    onSuccess: async () => {
      toaster.success('Email verified successfully.');

      await refetchCurrentUser();

      router.push('/app/all-bookmarks');
    },
    onError: () => {
      toaster.error('Something went wrong. Please try again later.');
    }
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: IResetPasswordPayload) => authService.forgotPassword(payload),
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
