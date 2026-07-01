import type { BrowserProvider } from './app.type';
import type { IBookmark } from './bookmark.type';
import type { MemberAccessLevel, MemberRole } from './member.type';

// Core Models

export type FolderId = string;
export interface IFolderMemberPreview {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
}

export interface IFolder {
  id: FolderId;
  name: string;
  bookmarkCount: number;
  recentBookmarkImages: string[];
  isProtected: boolean;
  isSystem: boolean;
  createdAt: string | null;
  updatedAt: string;
}

export interface ITransformedFolder extends IFolder {
  isSelected: boolean;
}

export interface IBookmarkData {
  pinned: IBookmark[];
  data: IBookmark[];
}

export interface IFolderPermission {
  role: MemberRole;
  accessLevel: MemberAccessLevel;
}

// Query params

export type DateFilter = 'oldest' | 'newest';

export type OrderFilter = 'asc' | 'desc';

export interface GetFolderBookmarksQueryParams {
  page?: number;
  limit?: number;
  sortByBrowser?: BrowserProvider;
  sortByDate?: DateFilter;
  sortByTitle?: OrderFilter;
}

// Request payloads for folder related operations

export interface IGetFolderBookmarksPayload {
  folderId: FolderId;
  param: GetFolderBookmarksQueryParams;
}

export interface ICreateFolderPayload {
  name: string;
}

export interface IEditFolderPayload extends ICreateFolderPayload {
  folderId: FolderId;
}

export interface IDeleteFolderPayload {
  folderId: FolderId;
}

export interface IJoinFolderPayload {
  password?: string;
  folderId: FolderId;
}

// Response objects for folder related operations

export interface IFolderResponse {
  folder: IFolder;
}

export interface IGetFoldersResponse {
  systemFolders: IFolder[];
  ownedFolders: IFolder[];
  sharedFolders: IFolder[];
}

export interface IFolderBookmarksResponse {
  folder: {
    id: FolderId;
    name: string;
    isSystem: boolean;
    memberCount: number;
    bookmarkCount: number;
  };
  permission: IFolderPermission;
  previewMembers: IFolderMemberPreview[];
  pinnedBookmarks: IBookmark[];
  bookmarks: IBookmark[];
  meta: {
    currentPage: number;
    totalPages: number;
  };
}
