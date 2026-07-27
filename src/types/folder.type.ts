import type { IBookmark, IGetBookmarksQueryParams } from './bookmark.type';
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
  recentBookmarksImages: string[];
  isProtected: boolean;
  isSystem: boolean;
  createdAt: string;
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

export type SortBookmarks = 'title_desc' | 'title_asc' | 'newest' | 'oldest';

// Request payloads for folder related operations

export interface IGetFolderBookmarksPayload {
  folderId: FolderId;
  param: IGetBookmarksQueryParams;
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

export interface IAddPasswordToFolderPayload {
  password: string;
  folderId: FolderId;
}

export interface IRemovePasswordFromFolderPayload {
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
  meta: {
    totalBookmarks: number;
  };
}

export interface IFolderBookmarksResponse {
  folder: {
    id: FolderId;
    name: string;
    isSystem: boolean;
    memberCount: number;
    bookmarkCount: number;
    isProtected: boolean;
  };
  permission: IFolderPermission;
  previewMembers: IFolderMemberPreview[];
  pinnedBookmarks: IBookmark[];
  bookmarks: IBookmark[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
}
