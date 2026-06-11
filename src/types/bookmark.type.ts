export interface BookmarkCreator {
  name: string;
  avatarUrl: string | null;
}

export interface IBookmark {
  id: string;
  title: string;
  description: string | null;
  websiteName: string;
  url: string;
  domain: string;
  folderName: string;
  createdAt: string;
  isPinned: boolean;
  tags: string[];
  coverImageUrl: string | null;
  faviconUrl: string | null;
  addedBy: BookmarkCreator | null;
}

export interface IBookmarksResponse {
  pinned: IBookmark[];
  data: IBookmark[];
  meta: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export type BrowserFilter = 'all' | 'chrome' | 'arc' | 'firefox' | 'opera' | 'brave' | 'edge';

export type DateFilter = 'oldest' | 'newest';

export type OrderFilter = 'asc' | 'desc';

export interface GetBookmarksQueryParams {
  page: number;
  limit?: number;
  browser?: BrowserFilter;
  date?: DateFilter;
  order?: OrderFilter;
}
