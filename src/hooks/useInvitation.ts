import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { invitationService } from '@/services/invitation.service';
import type { IBaseInvitationPayload, ICreateInvitationPayload } from '@/types/invitation.type';

/**
 * Hook to retrieve invitation details (used on the "You have been invited" landing page).
 */
export function useGetInvitations() {
  return useQuery({
    queryKey: QUERY_KEYS.invitation.getInvitations(),
    queryFn: () => invitationService.getInvitations(),
    staleTime: 1000 * 60 * 5
  });
}

/**
 * Hook to send an invitation to a user.
 */
export function useCreateInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateInvitationPayload) =>
      invitationService.createInvitationLink(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitation.lists() });
    }
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

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitation.lists() });
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

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitation.lists() });
    }
  });
}
