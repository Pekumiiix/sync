export interface ISelectedBookmark {
  id: string;
  isPinned: boolean;
}

export type DisplayType = 'list' | 'grid';
export type SortOrder = 'a-z' | 'z-a' | 'newest' | 'oldest';
