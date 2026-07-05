import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { accountService } from '@/services/account.service';
import type { IUpdateProfilePayload, IUpdateSettingsPayload } from '@/types/account.type';
import { toaster } from '@/utils/toastUtils';

export function useCurrentUser() {
  return useQuery({
    queryKey: QUERY_KEYS.auth.currentUser(),
    queryFn: () => accountService.getProfile(),
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

      toaster.success('Profile updated successfully');
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
    }
  });
}
