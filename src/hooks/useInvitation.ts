import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { invitationService } from '@/services/invitation.service';
import type { IBaseInvitationPayload, IUserInvitationPayload } from '@/types/invitation.type';

/**
 * Hook to retrieve invitation details (used on the "You have been invited" landing page).
 */
export function useGetInvitationDetails(payload: MaybeRefOrGetter<IBaseInvitationPayload>) {
  return useQuery(
    computed(() => {
      const unwrappedPayload = toValue(payload);

      return {
        queryKey: QUERY_KEYS.invitation.detail(unwrappedPayload.token),
        queryFn: () => invitationService.getInvitationDetails(unwrappedPayload),
        enabled: !!unwrappedPayload.token,
        staleTime: 1000 * 60 * 5
      };
    })
  );
}

/**
 * Hook to send an invitation email to a new user.
 */
export function useInviteUser() {
  return useMutation({
    mutationFn: (payload: IUserInvitationPayload) => invitationService.inviteUser(payload)
  });
}

/**
 * Hook to accept an invitation.
 */
export function useAcceptInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IBaseInvitationPayload) => invitationService.acceptInvitation(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.getFolders() });

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.invitation.detail(variables.token)
      });
    }
  });
}

/**
 * Hook to decline an invitation.
 */
export function useDeclineInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IBaseInvitationPayload) => invitationService.declineInvitation(payload),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.invitation.detail(variables.token)
      });
    }
  });
}
