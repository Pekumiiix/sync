import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/keys/query-keys';
import { folderService } from '@/services/folder.service';
import type { IApiResponse } from '@/types/api.type';
import type {
  IAddPasswordToFolderPayload,
  ICreateFolderPayload,
  IDeleteFolderPayload,
  IEditFolderPayload,
  IFolderBookmarksResponse,
  IGetFolderBookmarksPayload,
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
    staleTime: 1000 * 60 * 5
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
        queryKey: QUERY_KEYS.bookmark.getFolderBookmarks(unwrappedPayload),
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
    },
    onError: () => {
      toaster.error('Failed to create folder');
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
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getFolders()
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.bookmark.byFolderBase(variables.folderId)
      });

      toaster.success(response.message);
    },
    onError: () => {
      toaster.error('Failed to edit folder');
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
        queryKey: QUERY_KEYS.bookmark.byFolderBase(variables.folderId)
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.bookmark.lists()
      });

      toaster.success('Folder deleted successfully');

      router.replace({ name: 'All Bookmarks' });
    },
    onError: (error) => {
      toaster.error(error.message);
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getFolders()
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.bookmark.byFolderBase(variables.folderId)
      });

      toaster.success('Password added to folder successfully');
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

/**
 * Removes a password from a folder
 */
export function useRemovePasswordFromFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IRemovePasswordFromFolderPayload) =>
      folderService.removePasswordFromFolder(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getFolders()
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.bookmark.byFolderBase(variables.folderId)
      });

      toaster.success('Password removed from folder successfully');
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}
