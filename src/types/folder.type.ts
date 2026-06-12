import type { IBookmark } from './bookmark.type';

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

export interface GetFolderBookmarksParams {
  page: number;
  limit?: number;
}

export interface IFolderBookmarksResponse {
  folder: {
    id: string;
    name: string;
    isSystem: boolean;
  };
  data: IBookmark[];
  meta: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}
