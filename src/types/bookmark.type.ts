import type { BrowserProvider } from './app.type';
import type { FolderId } from './folder.type';

// Core models

export type BookmarkId = string;

export type SortBookmarks = 'title_desc' | 'title_asc' | 'newest' | 'oldest';

export interface IGetBookmarksQueryParams {
  page?: number;
  limit?: number;
  sort?: SortBookmarks;
  filter?: BrowserProvider | 'all';
}

export interface BookmarkCreator {
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
}

export interface IBookmark {
  id: BookmarkId;
  folder: {
    id: FolderId;
    name: string;
  };
  title: string | null;
  description: string | null;
  websiteName: string | null;
  url: string;
  domain: string;
  createdAt: string;
  isPinned: boolean;
  tags: string[];
  coverImageUrl: string | null;
  faviconUrl: string | null;
  canEdit: boolean;
  addedBy: BookmarkCreator | null;
  browser: BrowserProvider;
  updatedAt: string;
}

export interface IBrowser {
  browser: BrowserProvider;
}

export interface IBulkActionPayload {
  bookmarkIds: BookmarkId[];
}

// Request payloads for bookmark related operations

export interface IBaseBookmarkPayload {
  folderId: FolderId;
  title?: string;
  description?: string;
  tags?: string[];
  url: string;
}

export interface ICreateBookmarkPayload extends IBaseBookmarkPayload {
  coverImageUrl?: string;
  faviconUrl?: string;
  browser: BrowserProvider;
  websiteName?: string;
  domain: string;
}

export interface IEditBookmarkPayload extends Pick<
  IBaseBookmarkPayload,
  'title' | 'description' | 'tags'
> {
  bookmarkId: BookmarkId;
}

export interface IMoveBookmarkPayload {
  bookmarkId: BookmarkId;
  folderId: FolderId;
}

export interface IDeleteBookmarkPayload {
  bookmarkId: BookmarkId;
}

export interface TogglePinBookmarkPayload {
  bookmarkId: BookmarkId;
}

export interface IPreviewBookmarkPayload {
  url: string;
}

export interface IBrowserPayload {
  folderId?: FolderId;
}

export interface IBulkMoveBookmarksPayload {
  bookmarkIds: BookmarkId[];
  folderId: FolderId;
}

// Response objects for bookmark related operations

export interface IBookmarkResponse {
  bookmark: IBookmark;
}

export interface IPreviewBookmarkResponse {
  openGraphData: {
    title: string | null;
    description: string | null;
    coverImageUrl: string | null;
    faviconUrl: string | null;
    websiteName: string | null;
    domain: string;
    url: string;
  };
}

export interface IAllBookmarkResponse {
  bookmarks: IBookmark[];
  pinnedBookmarks: IBookmark[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
}

export interface IBookmarkResponse {
  bookmark: IBookmark;
}

export interface IBrowserResponse {
  browsers: IBrowser[];
}
