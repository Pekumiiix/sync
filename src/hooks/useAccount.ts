import type { MaybeRefOrGetter } from 'vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/keys/query-keys';
import { accountService } from '@/services/account.service';
import type {
  IDisconnectOAuthIdentityPayload,
  IUpdateProfilePayload,
  IUpdateSettingsPayload
} from '@/types/account.type';
import { toaster } from '@/utils/toastUtils';

export function useCurrentUser(enabled: MaybeRefOrGetter<boolean> = true) {
  return useQuery({
    queryKey: QUERY_KEYS.auth.currentUser(),
    queryFn: () => accountService.getProfile(),
    staleTime: 1000 * 60 * 5,
    enabled
  });
}

export function useOAuthIdentities() {
  return useQuery({
    queryKey: QUERY_KEYS.oauthIdentities.lists(),
    queryFn: () => accountService.getOAuthIdentities(),
    staleTime: 1000 * 60 * 5
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateProfilePayload) => accountService.updateProfile(payload),
    onSuccess: (response) => {
      queryClient.setQueryData(QUERY_KEYS.auth.currentUser(), {
        data: { user: response.data.user }
      });

      toaster.success(response.message);
    },
    onError: () => {
      toaster.error('Failed to update profile');
    }
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateSettingsPayload) => accountService.updateSettings(payload),
    onSuccess: (response) => {
      queryClient.setQueryData(QUERY_KEYS.auth.currentUser(), {
        data: { user: response.data.user }
      });

      toaster.success(response.message);
    },
    onError: () => {
      toaster.error('Failed to update settings');
    }
  });
}

export function useDisconnectOAuthIdentity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IDisconnectOAuthIdentityPayload) =>
      accountService.disconnectOAuthIdentity(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.oauthIdentities.lists() });
      toaster.success(response.message);
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}
