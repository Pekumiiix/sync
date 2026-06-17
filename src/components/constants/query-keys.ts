import type {
  GetFolderBookmarksQueryParams,
  IGetFolderBookmarksPayload
} from '@/types/folder.type';

export const QUERY_KEYS = {
  auth: {
    all: ['auth'] as const,
    currentUser: () => [...QUERY_KEYS.auth.all, 'currentUser'] as const
  },
  folder: {
    all: ['folders'] as const,
    lists: () => [...QUERY_KEYS.folder.all, 'list'] as const,
    getFolders: () => [...QUERY_KEYS.folder.lists()] as const,
    bookmarks: () => [...QUERY_KEYS.folder.all, 'bookmarks'] as const,
    allBookmarksBase: () => [...QUERY_KEYS.folder.bookmarks(), 'all'] as const,
    getAllBookmarks: (params: GetFolderBookmarksQueryParams) =>
      [...QUERY_KEYS.folder.allBookmarksBase(), { ...params }] as const,
    folderBookmarksBase: (folderId: string) =>
      [...QUERY_KEYS.folder.bookmarks(), 'detail', folderId] as const,
    getFolderBookmarks: (payload: IGetFolderBookmarksPayload) =>
      [
        ...QUERY_KEYS.folder.folderBookmarksBase(payload.folderId),
        { params: payload.param }
      ] as const
  },
  invitation: {
    all: ['invitations'] as const,
    detail: (token: string) => [...QUERY_KEYS.invitation.all, 'detail', token] as const
  },
  notification: {
    all: ['notifications'] as const,
    lists: () => [...QUERY_KEYS.notification.all, 'list'] as const,
    getAllNotifications: () => [...QUERY_KEYS.notification.lists()] as const
  }
} as const;
