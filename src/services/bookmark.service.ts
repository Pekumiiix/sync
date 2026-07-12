import type { IApiResponse } from '@/types/api.type';
import type {
  IAllBookmarkResponse,
  IBookmarkResponse,
  IBrowserPayload,
  IBrowserResponse,
  IBulkActionPayload,
  IBulkMoveBookmarksPayload,
  ICreateBookmarkPayload,
  IDeleteBookmarkPayload,
  IEditBookmarkPayload,
  IMoveBookmarkPayload,
  IPreviewBookmarkPayload,
  IPreviewBookmarkResponse,
  TogglePinBookmarkPayload
} from '@/types/bookmark.type';
import type { GetFolderBookmarksQueryParams } from '@/types/folder.type';
import { apiClient } from '@/utils/apiUtils';

class BookmarkService {
  getAllBookmarks(params: GetFolderBookmarksQueryParams) {
    return apiClient<IApiResponse<IAllBookmarkResponse>>('get', `/bookmarks`, params);
  }

  previewBookmark(payload: IPreviewBookmarkPayload) {
    return apiClient<IApiResponse<IPreviewBookmarkResponse>>('post', `/bookmarks/preview`, payload);
  }

  createBookmark(payload: ICreateBookmarkPayload) {
    return apiClient<IApiResponse<IBookmarkResponse>>('post', `/bookmarks`, payload);
  }

  editBookmark(payload: IEditBookmarkPayload) {
    const { bookmarkId, ...data } = payload;

    return apiClient<IApiResponse<IBookmarkResponse>>('patch', `/bookmarks/${bookmarkId}`, data);
  }

  unpinBookmark(payload: TogglePinBookmarkPayload) {
    const { bookmarkId } = payload;

    return apiClient<IApiResponse<IBookmarkResponse>>('patch', `/bookmarks/${bookmarkId}/unpin`);
  }

  pinBookmark(payload: TogglePinBookmarkPayload) {
    const { bookmarkId } = payload;

    return apiClient<IApiResponse<IBookmarkResponse>>('patch', `/bookmarks/${bookmarkId}/pin`);
  }

  moveBookmark(payload: IMoveBookmarkPayload) {
    const { bookmarkId, folderId } = payload;

    return apiClient<IApiResponse<IBookmarkResponse>>('patch', `/bookmarks/${bookmarkId}/move`, {
      folderId
    });
  }

  deleteBookmark(payload: IDeleteBookmarkPayload) {
    const { bookmarkId } = payload;

    return apiClient<IApiResponse>('delete', `/bookmarks/${bookmarkId}`);
  }

  getBookmarkBrowsers(payload?: IBrowserPayload) {
    return apiClient<IApiResponse<IBrowserResponse>>('get', `/bookmarks/browsers`, payload);
  }

  bulkDeleteBookmarks(payload: IBulkActionPayload) {
    return apiClient<IApiResponse>('delete', `/bookmarks/delete`, payload);
  }

  bulkMoveBookmarks(payload: IBulkMoveBookmarksPayload) {
    return apiClient<IApiResponse>('patch', `/bookmarks/move`, payload);
  }

  bulkUnpinBookmarks(payload: IBulkActionPayload) {
    return apiClient<IApiResponse>('patch', `/bookmarks/unpin`, payload);
  }
}

export const bookmarkService = new BookmarkService();
