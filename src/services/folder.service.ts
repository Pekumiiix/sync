import type { IApiResponse } from '@/types/api.type';
import type {
  ICreateFolderPayload,
  IDeleteFolderPayload,
  IEditFolderPayload,
  IFolderBookmarksResponse,
  IGetFolderBookmarksPayload,
  IGetFoldersResponse
} from '@/types/folder.type';
import { apiClient } from '@/utils/apiUtils';

class FolderService {
  getFolders() {
    return apiClient<IApiResponse<IGetFoldersResponse[]>>('get', '/folders');
  }

  createFolder(payload: ICreateFolderPayload) {
    return apiClient<IApiResponse>('post', '/folders', payload);
  }

  editFolder(payload: IEditFolderPayload) {
    return apiClient<IApiResponse>('put', `/folders/${payload.folderId}`, payload.name);
  }

  deleteFolder(payload: IDeleteFolderPayload) {
    return apiClient<IApiResponse>('delete', `/folders/${payload.folderId}`);
  }

  getFolderBookmarks(payload: IGetFolderBookmarksPayload) {
    const { folderId, param } = payload;

    return apiClient<IApiResponse<IFolderBookmarksResponse[]>>(
      'get',
      `/folders/${folderId}/bookmarks`,
      param
    );
  }
}

export const folderService = new FolderService();
