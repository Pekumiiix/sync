type NotificationType = 'member_joined' | 'member_request' | 'invite_request' | 'entry_added';

export type ActionStatus = 'pending' | 'accepted' | 'declined';

interface NotificationActor {
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
