import { useRouter } from 'vue-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

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
  return useMutation({
    mutationFn: (payload: ISignUpPayload) => authService.signUp(payload),
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
      queryClient.setQueryData(QUERY_KEYS.auth.currentUser(), response.data);

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
      router.push('/auth/sign-in');
    }
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (payload: IVerifyEmailPayload) => authService.verifyEmail(payload),
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
      router.push('/auth/sign-in');
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: ICreateNewPasswordPayload) => authService.resetPassword(payload),
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: QUERY_KEYS.auth.currentUser(),
    queryFn: () => authService.currentUser(),
    staleTime: 1000 * 60 * 5
  });
}
