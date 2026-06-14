import type { IFolderBookmarksResponse } from '../types/folder.type';
import { mockBookmarksResponse } from './bookmarks';

export const mockFolderBookmarksResponse: IFolderBookmarksResponse = {
  folder: {
    id: 'fld_unsorted',
    name: 'Unsorted',
    isSystem: true,
    recentMembers: [
      {
        id: 'usr_1',
        name: 'Johnson Joshua',
        avatarUrl: 'https://i.pravatar.cc/150?u=jj1'
      },
      {
        id: 'usr_2',
        name: 'Teller Kamil',
        avatarUrl: 'https://i.pravatar.cc/150?u=tk1'
      },
      {
        id: 'usr_4',
        name: 'Dee Smoke',
        avatarUrl: 'https://i.pravatar.cc/150?u=ds1'
      }
    ],
    totalMemberCount: 19
  },
  data: mockBookmarksResponse,
  meta: {
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false
  }
};
