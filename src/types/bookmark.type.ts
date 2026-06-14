import type { BrowserProvider } from './app.type';

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
  browser: BrowserProvider;
}
