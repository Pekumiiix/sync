import type { IFolderMembersResponse } from '@/types/member.type';

export const mockFolderMembersResponse: IFolderMembersResponse = {
  folder: {
    id: 'fld_unsorted',
    name: 'Unsorted'
  },
  data: [
    {
      id: 'usr_1',
      name: 'Johnson Joshua',
      email: 'JJ@gmail.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=jj1',
      systemRole: 'admin',
      accessLevel: 'owner',
      canEditAccess: true
    },
    {
      id: 'usr_2',
      name: 'Teller Kamil',
      email: 'JJ@gmail.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=tk1',
      systemRole: 'admin',
      accessLevel: 'editor',
      canEditAccess: true
    },
    {
      id: 'usr_3',
      name: 'Teller Kamil',
      email: 'JJ@gmail.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=tk2',
      systemRole: 'member',
      accessLevel: 'viewer',
      canEditAccess: false
    },
    {
      id: 'usr_4',
      name: 'Dee Smoke',
      email: 'JJ@gmail.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=ds1',
      systemRole: 'member',
      accessLevel: 'viewer',
      canEditAccess: true
    }
  ],
  meta: {
    totalCount: 19
  }
};
