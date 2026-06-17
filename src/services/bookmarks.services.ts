import type { IApiResponse } from '@/types/api.type';
import type {
  IBookmark,
  ICreateBookmarkPayload,
  IDeleteBookmarkPayload,
  IEditBookmarkPayload,
  IMoveBookmarkPayload,
  TogglePinBookmarkPayload
} from '@/types/bookmark.type';
import type { GetFolderBookmarksQueryParams, IFolderBookmarksResponse } from '@/types/folder.type';
import { apiClient } from '@/utils/apiUtils';

class BookmarkService {
  getAllBookmarks(params: GetFolderBookmarksQueryParams) {
    return apiClient<IApiResponse<IFolderBookmarksResponse[]>>('get', `/bookmarks`, params);
  }

  createBookmark(payload: ICreateBookmarkPayload) {
    const { folderId, ...data } = payload;

    return apiClient<IApiResponse>('post', `/folders/${folderId}/bookmarks`, data);
  }

  editBookmark(payload: IEditBookmarkPayload) {
    const { bookmarkId, ...data } = payload;

    return apiClient<IApiResponse<IBookmark>>('put', `/bookmarks/${bookmarkId}`, data);
  }

  unpinBookmark(payload: TogglePinBookmarkPayload) {
    const { bookmarkId } = payload;

    return apiClient<IApiResponse<IBookmark>>('delete', `/bookmarks/${bookmarkId}/pin`);
  }

  pinBookmark(payload: TogglePinBookmarkPayload) {
    const { bookmarkId } = payload;

    return apiClient<IApiResponse<IBookmark>>('post', `/bookmarks/${bookmarkId}/pin`);
  }

  moveBookmark(payload: IMoveBookmarkPayload) {
    const { bookmarkId, folderId } = payload;

    return apiClient<IApiResponse<IBookmark>>('put', `/bookmarks/${bookmarkId}/move`, {
      folderId
    });
  }

  deleteBookmark(payload: IDeleteBookmarkPayload) {
    const { bookmarkId } = payload;

    return apiClient<IApiResponse>('delete', `/bookmarks/${bookmarkId}`);
  }
}

export const bookmarkService = new BookmarkService();
