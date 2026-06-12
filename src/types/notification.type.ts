export type NotificationType =
  | 'member_joined'
  | 'member_request'
  | 'invite_request'
  | 'entry_added';

export type ActionStatus = 'pending' | 'accepted' | 'declined';

export interface NotificationActor {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface BaseNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  actor: NotificationActor;
}

// --- Specific Notification Interfaces ---

export interface MemberJoinedNotification extends BaseNotification {
  type: 'member_joined';
  metadata: {
    workspaceId: string;
  };
}

export interface MemberRequestNotification extends BaseNotification {
  type: 'member_request';
  actionStatus: ActionStatus;
  metadata: {
    requestId: string;
    workspaceId: string;
  };
}

export interface InviteRequestNotification extends BaseNotification {
  type: 'invite_request';
  actionStatus: ActionStatus;
  metadata: {
    inviteId: string;
    folderId: string;
  };
}

export interface EntryAddedNotification extends BaseNotification {
  type: 'entry_added';
  metadata: {
    entryId: string;
    folderId: string;
  };
}

export type INotification =
  | MemberJoinedNotification
  | MemberRequestNotification
  | InviteRequestNotification
  | EntryAddedNotification;

export interface INotificationsResponse {
  data: INotification[];
  meta: {
    unreadCount: number;
    totalCount: number;
    currentPage: number;
    hasNextPage: boolean;
  };
}

// ============================================================================
// MOCK PAYLOAD (Mirroring your UI exactly)
// ============================================================================

export const mockNotificationsResponse: INotificationsResponse = {
  data: [
    {
      id: 'notif_1',
      type: 'member_joined',
      title: 'New Member Joined',
      message:
        'Your request has been accepted your invitation and are now part of the unsorted workspace',
      createdAt: new Date(Date.now() - 3 * 60000).toISOString(), // 3 mins ago
      isRead: false,
      actor: {
        id: 'user_99',
        name: 'System',
        avatarUrl: 'https://i.pravatar.cc/150?u=workspace'
      },
      metadata: { workspaceId: 'ws_123' }
    },
    {
      id: 'notif_2',
      type: 'member_request',
      title: 'New Member request',
      message: 'Abayomi has sent a request to be part of unsorted, click below to choose an option',
      createdAt: new Date(Date.now() - 3 * 60000).toISOString(),
      isRead: false,
      actionStatus: 'pending', // Triggers the Decline/Accept buttons
      actor: {
        id: 'user_1',
        name: 'Abayomi',
        avatarUrl: 'https://i.pravatar.cc/150?u=abayomi'
      },
      metadata: { requestId: 'req_456', workspaceId: 'ws_123' }
    },
    {
      id: 'notif_3',
      type: 'invite_request',
      title: 'New invite request',
      message:
        'Johnson has requested your access to the folder "Unsorted". Join to begin collaborating.',
      createdAt: new Date(Date.now() - 3 * 60000).toISOString(),
      isRead: false,
      actionStatus: 'pending',
      actor: {
        id: 'user_2',
        name: 'Johnson',
        avatarUrl: 'https://i.pravatar.cc/150?u=johnson'
      },
      metadata: { inviteId: 'inv_789', folderId: 'fld_101' }
    },
    {
      id: 'notif_4',
      type: 'entry_added',
      title: 'New Entry Added',
      message: 'Kamara has added a new entry to "Unsorted" Take a look to stay updated.',
      createdAt: new Date(Date.now() - 3 * 60000).toISOString(),
      isRead: false,
      actor: {
        id: 'user_3',
        name: 'Kamara',
        avatarUrl: 'https://i.pravatar.cc/150?u=kamara'
      },
      metadata: { entryId: 'ent_202', folderId: 'fld_101' }
    }
  ],
  meta: {
    unreadCount: 4,
    totalCount: 45,
    currentPage: 1,
    hasNextPage: true
  }
};
