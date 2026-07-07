import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { bookmarkService } from '@/services/bookmark.service';
import type {
  IBrowserPayload,
  ICreateBookmarkPayload,
  IDeleteBookmarkPayload,
  IEditBookmarkPayload,
  IMoveBookmarkPayload,
  IPreviewBookmarkPayload,
  TogglePinBookmarkPayload
} from '@/types/bookmark.type';
import type { GetFolderBookmarksQueryParams } from '@/types/folder.type';
import { toaster } from '@/utils/toastUtils';

export function useGetAllBookmarks(params: MaybeRefOrGetter<GetFolderBookmarksQueryParams>) {
  return useQuery(
    computed(() => {
      const unwrappedParams = toValue(params);

      return {
        queryKey: computed(() => QUERY_KEYS.folder.getAllBookmarks(unwrappedParams)),
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
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.getFolders() });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.allBookmarksBase() });

      if (variables.folderId) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.folder.folderBookmarksBase(variables.folderId)
        });
      }

      toaster.success(response.message);
    }
  });
}

export function useEditBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IEditBookmarkPayload) => bookmarkService.editBookmark(payload),
    onSuccess: (response) => {
      const updatedBookmark = response.data.bookmark;

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.allBookmarksBase() });

      if (updatedBookmark?.folder.id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.folder.folderBookmarksBase(updatedBookmark.folder.id)
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
      const bookmark = response.data.bookmark;

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.allBookmarksBase() });

      toaster.success(response.message);

      if (bookmark?.folder.id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.folder.folderBookmarksBase(bookmark.folder.id)
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
      const bookmark = response.data.bookmark;

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.allBookmarksBase() });

      toaster.success(response.message);

      if (bookmark?.folder.id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.folder.folderBookmarksBase(bookmark.folder.id)
        });
      }
    }
  });
}

export function useMoveBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IMoveBookmarkPayload) => bookmarkService.moveBookmark(payload),
    onSuccess: async () => {
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
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.getFolders() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.bookmarks() });

      toaster.success(response.message);
    }
  });
}

export function useGetBookmarkBrowsers(payload?: IBrowserPayload) {
  return useQuery({
    queryKey: QUERY_KEYS.folder.getBookmarkBrowsers(payload?.folder),
    queryFn: () => bookmarkService.getBookmarkBrowsers(payload),
    staleTime: 1000 * 60 * 5
  });
}

export function useGetBookmarkPreview() {
  return useMutation({
    mutationFn: (payload: IPreviewBookmarkPayload) => bookmarkService.previewBookmark(payload)
  });
}
