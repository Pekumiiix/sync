import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { folderService } from '@/services/folder.service';
import type {
  ICreateFolderPayload,
  IDeleteFolderPayload,
  IEditFolderPayload,
  IGetFolderBookmarksPayload,
  IJoinFolderPayload
} from '@/types/folder.type';

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
export function useGetFolderBookmarks(payload: IGetFolderBookmarksPayload) {
  return useQuery({
    queryKey: QUERY_KEYS.folder.getFolderBookmarks(payload),
    queryFn: () => folderService.getFolderBookmarks(payload),
    staleTime: 1000 * 60 * 5,
    enabled: !!payload.folderId
  });
}

/**
 * Creates a new folder and forces a cache invalidation for the list queries.
 */
export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateFolderPayload) => folderService.createFolder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getFolders()
      });
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getFolders()
      });
    }
  });
}

/**
 * Deletes a folder and evicts nested bookmark queries to avoid showing ghost data.
 */
export function useDeleteFolder() {
  const queryClient = useQueryClient();

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
