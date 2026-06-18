import type { BrowserProvider } from './app.type';
import type { IBookmark } from './bookmark.type';

// ==========================================
// 1. CORE MODELS & ENTITIES
// ==========================================

export type FolderId = string;

export interface IFolderMemberPreview {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface IFolder {
  id: FolderId;
  name: string;
  bookmarkCount: number;
  recentBookmarkImages: string[];
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

// ==========================================
// 2. QUERY PARAMS (URL / GET Variables)
// ==========================================

export type DateFilter = 'oldest' | 'newest';

export type OrderFilter = 'asc' | 'desc';

export interface GetFolderBookmarksQueryParams {
  page: number;
  limit?: number;
  browser?: BrowserProvider | 'all';
  date?: DateFilter;
  order?: OrderFilter;
}

// ==========================================
// 3. REQUEST PAYLOADS (Mutations)
// ==========================================

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

// ==========================================
// 4. API RESPONSES
// ==========================================

export interface IGetFoldersResponse {
  systemFolders: IFolder[];
  collections: IFolder[];
}

export interface IFolderBookmarksResponse {
  folder: {
    id: FolderId;
    name: string;
    isSystem: boolean;
    recentMembers: IFolderMemberPreview[];
    totalMemberCount: number;
  };
  data: IBookmarkData;
  meta: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}
