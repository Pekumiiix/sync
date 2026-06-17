import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { bookmarkService } from '@/services/bookmarks.services';
import type {
  ICreateBookmarkPayload,
  IDeleteBookmarkPayload,
  IEditBookmarkPayload,
  IMoveBookmarkPayload,
  TogglePinBookmarkPayload
} from '@/types/bookmark.type';
import type { GetFolderBookmarksQueryParams } from '@/types/folder.type';

export function useGetAllBookmarks(params: MaybeRefOrGetter<GetFolderBookmarksQueryParams>) {
  return useQuery(
    computed(() => {
      const unwrappedParams = toValue(params);
      return {
        queryKey: QUERY_KEYS.folder.getAllBookmarks(unwrappedParams),
        queryFn: () => bookmarkService.getAllBookmarks(unwrappedParams),
        staleTime: 1000 * 60 * 5
      };
    })
  );
}

export function useCreateBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateBookmarkPayload) => bookmarkService.createBookmark(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.getFolders() });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.allBookmarksBase() });

      if (variables.folderId) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.folder.folderBookmarksBase(variables.folderId)
        });
      }
    }
  });
}

export function useEditBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IEditBookmarkPayload) => bookmarkService.editBookmark(payload),
    onSuccess: (response) => {
      const updatedBookmark = response.data;

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.allBookmarksBase() });

      if (updatedBookmark?.folderId) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.folder.folderBookmarksBase(updatedBookmark.folderId)
        });
      }
    }
  });
}

export function usePinBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TogglePinBookmarkPayload) => bookmarkService.pinBookmark(payload),
    onSuccess: (response) => {
      const bookmark = response.data;

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.allBookmarksBase() });

      if (bookmark?.folderId) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.folder.folderBookmarksBase(bookmark.folderId)
        });
      }
    }
  });
}

export function useUnpinBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TogglePinBookmarkPayload) => bookmarkService.unpinBookmark(payload),
    onSuccess: (response) => {
      const bookmark = response.data;

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.allBookmarksBase() });

      if (bookmark?.folderId) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.folder.folderBookmarksBase(bookmark.folderId)
        });
      }
    }
  });
}

export function useMoveBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IMoveBookmarkPayload) => bookmarkService.moveBookmark(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.getFolders() });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.allBookmarksBase() });

      queryClient.invalidateQueries({ queryKey: [...QUERY_KEYS.folder.bookmarks(), 'detail'] });
    }
  });
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IDeleteBookmarkPayload) => bookmarkService.deleteBookmark(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.getFolders() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.bookmarks() });
    }
  });
}
