import type { IGetFoldersResponse } from '@/types/folder.type';

export const mockFoldersResponse: IGetFoldersResponse = {
  systemFolders: [
    {
      id: 'system_all',
      name: 'All bookmarks',
      bookmarkCount: 15,
      recentBookmarkImages: [
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&q=80',
        'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=100&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&q=80'
      ],
      isSystem: true,
      createdAt: null,
      updatedAt: '2023-10-30T12:00:00Z'
    },
    {
      id: 'system_unsorted',
      name: 'Unsorted',
      bookmarkCount: 4,
      recentBookmarkImages: [
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=100&q=80'
      ],
      isSystem: true,
      createdAt: null,
      updatedAt: '2023-10-30T12:00:00Z'
    }
  ],
  collections: [
    {
      id: 'fld_101',
      name: 'Collection',
      bookmarkCount: 1,
      recentBookmarkImages: [
        'https://images.unsplash.com/photo-1507925922837-326f12d9348d?w=100&q=80'
      ],
      isSystem: false,
      createdAt: '2023-10-25T14:22:00Z',
      updatedAt: '2023-10-25T14:22:00Z'
    }
  ]
};
