import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { folderService } from '@/services/folder.service';
import type { IApiResponse } from '@/types/api.type';
import type {
  IAddPasswordToFolderPayload,
  ICreateFolderPayload,
  IDeleteFolderPayload,
  IEditFolderPayload,
  IFolderBookmarksResponse,
  IGetFolderBookmarksPayload,
  IJoinFolderPayload,
  IRemovePasswordFromFolderPayload
} from '@/types/folder.type';
import type { ApiError } from '@/utils/apiUtils';
import { toaster } from '@/utils/toastUtils';

/**
 * Fetches all folders belonging to the authenticated user.
 */
export function useGetFolders() {
  return useQuery({
    queryKey: QUERY_KEYS.folder.getFolders(),
    queryFn: () => folderService.getFolders(),
    staleTime: 1000 * 60 * 5 // 5 minutes cache fresh time
  });
}

/**
 * Fetches bookmarks restricted to a single specific folder.
 */
export function useGetFolderBookmarks(payload: MaybeRefOrGetter<IGetFolderBookmarksPayload>) {
  return useQuery<IApiResponse<IFolderBookmarksResponse>, ApiError>(
    computed(() => {
      const unwrappedPayload = toValue(payload);

      return {
        queryKey: QUERY_KEYS.folder.getFolderBookmarks(unwrappedPayload),
        queryFn: () => folderService.getFolderBookmarks(unwrappedPayload),
        staleTime: 1000 * 60 * 5,
        enabled: !!unwrappedPayload.folderId
      };
    })
  );
}

/**
 * Creates a new folder and forces a cache invalidation for the list queries.
 */
export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateFolderPayload) => folderService.createFolder(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getFolders()
      });

      toaster.success(response.message);
    }
  });
}

/**
 * Edits a folder and invalidates the folder list to reflect visual name changes.
 */
export function useEditFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IEditFolderPayload) => folderService.editFolder(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getFolders()
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.folderBookmarksBase(variables.folderId)
      });
    }
  });
}

/**
 * Deletes a folder and evicts nested bookmark queries to avoid showing ghost data.
 */
export function useDeleteFolder() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: IDeleteFolderPayload) => folderService.deleteFolder(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getFolders()
      });

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.folder.folderBookmarksBase(variables.folderId)
      });

      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.folder.bookmarks(), 'all']
      });

      toaster.success('Folder deleted successfully');

      router.replace({ name: 'All Bookmarks' });
    }
  });
}

/**
 * Joins a folder
 */
export function useJoinFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IJoinFolderPayload) => folderService.joinFolder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getFolders()
      });
    }
  });
}

/**
 * Adds a password to a folder
 */
export function useAddPasswordToFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IAddPasswordToFolderPayload) =>
      folderService.addPasswordToFolder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getFolders()
      });

      toaster.success('Password added to folder successfully');
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

export function useRemovePasswordFromFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IRemovePasswordFromFolderPayload) =>
      folderService.removePasswordFromFolder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getFolders()
      });

      toaster.success('Password removed from folder successfully');
    }
  });
}
