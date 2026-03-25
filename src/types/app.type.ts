export interface IBookmarkCard {
  id: string;
  image: string;
  platform: string;
  link: string;
  collection: string;
  time: string;
  isPinned: boolean;
  tags: string[];
  description: string;
}

export interface ITransformedBookmark extends IBookmarkCard {
  isSelected: boolean;
}

export interface ISelectedBookmark {
  id: string;
  isPinned: boolean;
}

export type DisplayType = 'list' | 'grid';
export type SortOrder = 'a-z' | 'z-a' | 'newest' | 'oldest';
