import type {
  GetFolderBookmarksQueryParams,
  IGetFolderBookmarksPayload
} from '@/types/folder.type';
import type { SearchBookmarksQueryParams, SearchFolderQueryParams } from '@/types/search.type';

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
    folderBookmarksBase: (folderId: string) => ['folders', 'bookmarks', folderId] as const,
    getFolderBookmarks: (payload: IGetFolderBookmarksPayload) =>
      [...QUERY_KEYS.folder.folderBookmarksBase(payload.folderId), payload.param] as const,
    bookmarkBrowsersBase: () => [...QUERY_KEYS.folder.all, 'bookmark-browsers'] as const,
    getBookmarkBrowsers: (folderId?: string) =>
      [...QUERY_KEYS.folder.bookmarkBrowsersBase(), { folderId }] as const
  },
  invitation: {
    all: ['invitations'] as const,
    lists: () => [...QUERY_KEYS.invitation.all, 'list'] as const,
    getInvitations: () => [...QUERY_KEYS.invitation.lists()] as const,
    detail: (token: string) => [...QUERY_KEYS.invitation.all, 'detail', token] as const
  },
  notification: {
    all: ['notifications'] as const,
    lists: () => [...QUERY_KEYS.notification.all, 'list'] as const,
    getAllNotifications: () => [...QUERY_KEYS.notification.lists()] as const
  },
  member: {
    all: ['members'] as const,
    lists: () => [...QUERY_KEYS.member.all, 'list'] as const,
    detail: (memberId: string) => [...QUERY_KEYS.member.all, 'detail', memberId] as const
  },
  search: {
    all: ['search'] as const,
    bookmarks: (params: SearchBookmarksQueryParams) =>
      [...QUERY_KEYS.search.all, 'global', { ...params }] as const,
    folderBookmarks: (params: SearchFolderQueryParams) =>
      [...QUERY_KEYS.search.all, 'folder', params.folderId, { ...params }] as const
  },
  browserIntegration: {
    all: ['browser-integrations'] as const,
    lists: () => [...QUERY_KEYS.browserIntegration.all, 'list'] as const
  }
} as const;
