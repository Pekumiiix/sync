import type { INotification } from '@/types/app.type';

export const mockNotifications: INotification[] = [
  {
    id: 'notif_001',
    type: 'invite_request',
    isRead: false,
    createdAt: '3 mins ago',
    actor: {
      id: 'usr_1',
      name: 'Johnson',
      avatarUrl: 'https://i.pravatar.cc/150?u=johnson'
    },
    target: {
      id: 'fld_1',
      name: 'Unsorted',
      type: 'folder'
    },
    actionStatus: 'pending'
  },
  {
    id: 'notif_002',
    type: 'new_entry',
    isRead: false,
    createdAt: '15 mins ago',
    actor: {
      id: 'usr_2',
      name: 'Kamara',
      avatarUrl: 'https://i.pravatar.cc/150?u=kamara'
    },
    target: {
      id: 'fld_1',
      name: 'Unsorted',
      type: 'folder'
    }
  },
  {
    id: 'notif_003',
    type: 'member_request',
    isRead: true,
    createdAt: '2 hours ago',
    actor: {
      id: 'usr_3',
      name: 'Abayomi',
      avatarUrl: 'https://i.pravatar.cc/150?u=abayomi'
    },
    target: {
      id: 'ws_1',
      name: 'unsorted workspace',
      type: 'workspace'
    },
    actionStatus: 'pending'
  },
  {
    id: 'notif_004',
    type: 'new_member_joined',
    isRead: true, // Read
    createdAt: '1 day ago',
    actor: {
      id: 'usr_4',
      name: 'System',
      avatarUrl: 'https://i.pravatar.cc/150?u=system'
    },
    target: {
      id: 'ws_1',
      name: 'unsorted workspace',
      type: 'workspace'
    }
  }
];
