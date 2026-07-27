import type { IApiResponse } from '@/types/api.type';
import type {
  IAddPasswordToFolderPayload,
  ICreateFolderPayload,
  IDeleteFolderPayload,
  IEditFolderPayload,
  IFolderBookmarksResponse,
  IFolderResponse,
  IGetFolderBookmarksPayload,
  IGetFoldersResponse,
  IRemovePasswordFromFolderPayload
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

    return apiClient<IApiResponse<IFolderBookmarksResponse>>('get', `/folders/${folderId}`, param);
  }

  addPasswordToFolder(payload: IAddPasswordToFolderPayload) {
    const { folderId, password } = payload;

    return apiClient<IApiResponse<IFolderResponse>>('patch', `/folders/${folderId}/password`, {
      password
    });
  }

  removePasswordFromFolder(payload: IRemovePasswordFromFolderPayload) {
    return apiClient<IApiResponse<IFolderResponse>>(
      'delete',
      `/folders/${payload.folderId}/password`
    );
  }
}

export const folderService = new FolderService();
