import type { BrowserProvider } from './app.type';
import type { IBookmark } from './bookmark.type';

export interface IFolderMemberPreview {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface IFolder {
  id: string;
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

export interface IGetFoldersResponse {
  systemFolders: IFolder[];
  collections: IFolder[];
}

export interface IBookmarkData {
  pinned: IBookmark[];
  data: IBookmark[];
}

export interface IFolderBookmarksResponse {
  folder: {
    id: string;
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

export type DateFilter = 'oldest' | 'newest';

export type OrderFilter = 'asc' | 'desc';

export interface GetFolderBookmarksQueryParams {
  page: number;
  limit?: number;
  browser?: BrowserProvider | 'all';
  date?: DateFilter;
  order?: OrderFilter;
}

export interface SearchFolderBookmarksQueryParams extends GetFolderBookmarksQueryParams {
  query: string;
}

export interface ISearchFolderBookmarksResponse {
  data: IBookmark[];
  meta: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}
