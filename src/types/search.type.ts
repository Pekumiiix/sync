import type { IBookmark } from './bookmark.type';

export interface SearchBookmarksQueryParams {
  query: string;
  page?: number;
  limit?: number;
}

export interface SearchFolderQueryParams extends SearchBookmarksQueryParams {
  folderId: string;
}

export interface ISearchResponse {
  bookmarks: IBookmark[];
  meta: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}
