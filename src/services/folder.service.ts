import type { IApiResponse } from '@/types/api.type';
import type {
  ICreateFolderPayload,
  IDeleteFolderPayload,
  IEditFolderPayload,
  IFolderBookmarksResponse,
  IFolderResponse,
  IGetFolderBookmarksPayload,
  IGetFoldersResponse,
  IJoinFolderPayload
} from '@/types/folder.type';
import { apiClient } from '@/utils/apiUtils';

class FolderService {
  getFolders() {
    return apiClient<IApiResponse<IGetFoldersResponse>>('get', '/folders');
  }

  createFolder(payload: ICreateFolderPayload) {
    return apiClient<IApiResponse<IFolderResponse>>('post', '/folders', payload);
  }

  editFolder(payload: IEditFolderPayload) {
    return apiClient<IApiResponse<IFolderResponse>>('patch', `/folders/${payload.folderId}`, {
      name: payload.name
    });
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

  joinFolder(payload: IJoinFolderPayload) {
    const { folderId, password } = payload;

    return apiClient<IApiResponse>('post', `/folders/${folderId}/join`, {
      password
    });
  }
}

export const folderService = new FolderService();
