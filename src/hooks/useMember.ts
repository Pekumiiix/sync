import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/keys/query-keys';
import { memberService } from '@/services/member.services';
import type {
  IChangeMemberAccessLevelPayload,
  IFolderMembersPayload,
  IKickMemberPayload
} from '@/types/member.type';
import { toaster } from '@/utils/toastUtils';

/**
 * Hook to fetch the list of members for a specific folder.
 */
export function useGetFolderMembers(payload: MaybeRefOrGetter<IFolderMembersPayload>) {
  return useQuery(
    computed(() => {
      const unwrappedPayload = toValue(payload);

      return {
        queryKey: QUERY_KEYS.member.lists(),
        queryFn: () => memberService.getFolderMembers(unwrappedPayload),
        enabled: !!unwrappedPayload.folderId
      };
    })
  );
}

/**
 * Hook to change an existing member's permission level (e.g., Viewer to Editor).
 */
export function useChangeMemberAccessLevel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IChangeMemberAccessLevelPayload) =>
      memberService.changeMemberAccessLevel(payload),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.member.lists()
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.member.detail(variables.memberId)
      });

      toaster.success(response.message);
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

/**
 * Hook to permanently remove a member from the workspace/folder.
 */
export function useKickMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IKickMemberPayload) => memberService.kickMember(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.member.lists()
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getFolderDetails(variables.folderId)
      });

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.member.detail(variables.memberId)
      });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.getFolders() });

      toaster.success('Member removed successfully');
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

export function useLeaveFolder() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: IFolderMembersPayload) => memberService.leaveFolder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.member.lists()
      });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.getFolders() });

      router.replace({ name: 'All Bookmarks' });
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}
