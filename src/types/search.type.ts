import type { IBookmark } from './bookmark.type';
import type { GetFolderBookmarksQueryParams } from './folder.type';

export interface ISearchFolderBookmarksResponse {
  data: IBookmark[];
  meta: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export interface SearchFolderBookmarksQueryParams extends GetFolderBookmarksQueryParams {
  query: string;
}
