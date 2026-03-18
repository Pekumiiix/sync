export interface IBookmarkCard {
  id: string;
  image: string;
  platform: string;
  link: string;
  category: string;
  time: string;
}

export type DisplayType = 'list' | 'grid';
export type SortOrder = 'a-z' | 'z-a' | 'newest' | 'oldest';
