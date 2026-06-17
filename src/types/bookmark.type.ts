import type { BrowserProvider } from './app.type';
import type { FolderId } from './folder.type';

// ==========================================
// 1. CORE MODELS & ENTITIES
// ==========================================

export type BookmarkId = string;

export interface BookmarkCreator {
  name: string;
  avatarUrl: string | null;
}

export interface IBookmark {
  id: BookmarkId;
  folderId: FolderId;
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
  browser: BrowserProvider;
}

// ==========================================
// 2. REQUEST PAYLOADS (Mutations)
// ==========================================

export interface IBaseBookmarkPayload {
  folderId: FolderId;
  title: string;
  description: string;
  tags: string[];
  url: string;
}

export interface ICreateBookmarkPayload extends IBaseBookmarkPayload {
  coverImageUrl: string;
}

export interface IEditBookmarkPayload extends IBaseBookmarkPayload {
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
