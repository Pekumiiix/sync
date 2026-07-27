import type { IGetBookmarksQueryParams } from '@/types/bookmark.type';
import type { IGetFolderBookmarksPayload } from '@/types/folder.type';
import type { IGetNotificationsParam } from '@/types/notification.type';
import type { SearchBookmarksQueryParams, SearchFolderQueryParams } from '@/types/search.type';

export const QUERY_KEYS = {
  // Auth related queries
  auth: {
    all: ['auth'] as const,
    currentUser: () => [...QUERY_KEYS.auth.all, 'currentUser'] as const
  },
  // Folder related queries
  folder: {
    all: ['folders'] as const,
    lists: () => [...QUERY_KEYS.folder.all, 'list'] as const,
    getFolders: () => [...QUERY_KEYS.folder.lists()] as const,
    bookmarkBrowsersBase: () => [...QUERY_KEYS.folder.all, 'bookmark-browsers'] as const,
    getBookmarkBrowsers: (folderId?: string) =>
      [...QUERY_KEYS.folder.bookmarkBrowsersBase(), { folderId }] as const
  },
  // Bookmark related queries
  bookmark: {
    all: ['bookmarks'] as const,
    lists: () => [...QUERY_KEYS.bookmark.all, 'list'] as const,
    getAllBookmarks: (params: IGetBookmarksQueryParams) =>
      [...QUERY_KEYS.bookmark.lists(), 'all', { ...params }] as const,

    byFolderBase: (folderId: string) => [...QUERY_KEYS.bookmark.all, 'folder', folderId] as const,
    getFolderBookmarks: (payload: IGetFolderBookmarksPayload) =>
      [...QUERY_KEYS.bookmark.byFolderBase(payload.folderId), { ...payload.param }] as const,
    detail: (bookmarkId: string) => [...QUERY_KEYS.bookmark.all, 'detail', bookmarkId] as const
  },
  // Invitation related queries
  invitation: {
    all: ['invitations'] as const,
    lists: () => [...QUERY_KEYS.invitation.all, 'list'] as const,
    getInvitations: () => [...QUERY_KEYS.invitation.lists()] as const,
    detail: (token: string) => [...QUERY_KEYS.invitation.all, 'detail', token] as const
  },
  // Notification related queries
  notification: {
    all: ['notifications'] as const,
    lists: () => [...QUERY_KEYS.notification.all, 'list'] as const,
    getAllNotifications: (params: IGetNotificationsParam) =>
      [...QUERY_KEYS.notification.lists(), { ...params }] as const
  },
  // Member related queries
  member: {
    all: ['members'] as const,
    lists: () => [...QUERY_KEYS.member.all, 'list'] as const,
    detail: (memberId: string) => [...QUERY_KEYS.member.all, 'detail', memberId] as const
  },
  // Search related queries
  search: {
    all: ['search'] as const,
    bookmarks: (params: SearchBookmarksQueryParams) =>
      [...QUERY_KEYS.search.all, 'global', { ...params }] as const,
    folderBookmarks: (params: SearchFolderQueryParams) =>
      [...QUERY_KEYS.search.all, 'folder', params.folderId, { ...params }] as const
  },
  // Browser integration related queries
  browserIntegration: {
    all: ['browser-integrations'] as const,
    lists: () => [...QUERY_KEYS.browserIntegration.all, 'list'] as const
  }
} as const;
