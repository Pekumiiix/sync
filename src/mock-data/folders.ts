import type { IFolderCard } from '@/types/app.type';

export const mockFolders: IFolderCard[] = [
  {
    id: crypto.randomUUID(),
    name: 'All bookmarks',
    updated_at: new Date().toISOString(),
    item_count: 20
  },
  {
    id: crypto.randomUUID(),
    name: 'Unsorted',
    updated_at: new Date().toISOString(),
    item_count: 19
  },
  {
    id: crypto.randomUUID(),
    name: 'Collections',
    updated_at: new Date().toISOString(),
    item_count: 18
  }
];
