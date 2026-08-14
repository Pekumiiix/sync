import type { IApiResponse } from '@/types/api.type';
import type { IAllBookmarkResponse } from '@/types/bookmark.type';
import type {
  IAddPasswordToFolderPayload,
  IChangePasswordForFolderPayload,
  ICreateFolderPayload,
  IDeleteFolderPayload,
  IEditFolderPayload,
  IFolderDetailsResponse,
  IFolderResponse,
  IGetFolderBookmarksPayload,
  IGetFolderDetailsPayload,
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

  getFolderDetails(payload: IGetFolderDetailsPayload) {
    const { folderId } = payload;

    return apiClient<IApiResponse<IFolderDetailsResponse>>('get', `/folders/${folderId}`);
  }

  getFolderBookmarks(payload: IGetFolderBookmarksPayload) {
    const { folderId, param } = payload;

    return apiClient<IApiResponse<IAllBookmarkResponse>>(
      'get',
      `/folders/${folderId}/bookmarks`,
      param
    );
  }

  addPasswordToFolder(payload: IAddPasswordToFolderPayload) {
    const { folderId, password } = payload;

    return apiClient<IApiResponse<IFolderResponse>>('patch', `/folders/${folderId}/password`, {
      password
    });
  }

  changePasswordForFolder(payload: IChangePasswordForFolderPayload) {
    const { folderId, newPassword, oldPassword } = payload;

    return apiClient<IApiResponse<IFolderResponse>>(
      'patch',
      `/folders/${folderId}/password/change`,
      {
        newPassword,
        oldPassword
      }
    );
  }

  removePasswordFromFolder(payload: IRemovePasswordFromFolderPayload) {
    return apiClient<IApiResponse<IFolderResponse>>(
      'delete',
      `/folders/${payload.folderId}/password`
    );
  }
}

export const folderService = new FolderService();
