import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { bookmarkService } from '@/services/bookmark.service';
import type {
  IBrowserPayload,
  IBulkActionPayload,
  IBulkMoveBookmarksPayload,
  ICreateBookmarkPayload,
  IDeleteBookmarkPayload,
  IEditBookmarkPayload,
  IGetBookmarksQueryParams,
  IMoveBookmarkPayload,
  IPreviewBookmarkPayload,
  TogglePinBookmarkPayload
} from '@/types/bookmark.type';
import { toaster } from '@/utils/toastUtils';

export function useGetAllBookmarks(params: MaybeRefOrGetter<IGetBookmarksQueryParams>) {
  return useQuery(
    computed(() => {
      const unwrappedParams = toValue(params);

      return {
        queryKey: QUERY_KEYS.bookmark.getAllBookmarks(unwrappedParams),
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookmark.lists() });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.bookmark.byFolderBase(variables.folderId)
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getBookmarkBrowsers(variables.folderId)
      });

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

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookmark.lists() });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.bookmark.byFolderBase(updatedBookmark.folder.id)
      });
    }
  });
}

export function usePinBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TogglePinBookmarkPayload) => bookmarkService.pinBookmark(payload),
    onSuccess: (response) => {
      const bookmark = response.data.bookmark;

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookmark.lists() });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.bookmark.byFolderBase(bookmark.folder.id)
      });

      toaster.success(response.message);
    }
  });
}

export function useUnpinBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TogglePinBookmarkPayload) => bookmarkService.unpinBookmark(payload),
    onSuccess: (response) => {
      const bookmark = response.data.bookmark;

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookmark.lists() });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.bookmark.byFolderBase(bookmark.folder.id)
      });

      toaster.success(response.message);
    }
  });
}

export function useBulkUnpinBookmarks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IBulkActionPayload) => bookmarkService.bulkUnpinBookmarks(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookmark.all });

      toaster.success(response.message);
    }
  });
}

export function useMoveBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IMoveBookmarkPayload) => bookmarkService.moveBookmark(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.getFolders() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookmark.all });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getBookmarkBrowsers(variables.folderId)
      });
    }
  });
}

export function useBulkMoveBookmarks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IBulkMoveBookmarksPayload) => bookmarkService.bulkMoveBookmarks(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.getFolders() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookmark.all });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.folder.getBookmarkBrowsers(variables.folderId)
      });
    }
  });
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IDeleteBookmarkPayload) => bookmarkService.deleteBookmark(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.getFolders() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.bookmarkBrowsersBase() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookmark.all });

      toaster.success(response.message);
    }
  });
}

export function useBulkDeleteBookmarks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IBulkActionPayload) => bookmarkService.bulkDeleteBookmarks(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.getFolders() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.folder.bookmarkBrowsersBase() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookmark.all });

      toaster.success(response.message);
    }
  });
}

export function useGetBookmarkBrowsers(payload?: IBrowserPayload) {
  return useQuery({
    queryKey: QUERY_KEYS.folder.getBookmarkBrowsers(payload?.folderId),
    queryFn: () => bookmarkService.getBookmarkBrowsers(payload),
    staleTime: 1000 * 60 * 5
  });
}

export function useGetBookmarkPreview() {
  return useMutation({
    mutationFn: (payload: IPreviewBookmarkPayload) => bookmarkService.previewBookmark(payload)
  });
}
