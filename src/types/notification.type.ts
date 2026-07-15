// Core models

type NotificationType =
  | 'member_joined'
  | 'member_left'
  | 'member_removed'
  | 'new_bookmark'
  | 'bookmark_updated'
  | 'bookmark_deleted'
  | 'folder_updated'
  | 'folder_deleted';

export type ActionStatus = 'pending' | 'accepted' | 'declined';

interface NotificationActor {
  firstName: string;
  lastName: string;
  avatar: string | null;
}

export interface NotificationFolder {
  folderName: string;
  folderId: string;
}

export interface INotification {
  id: string;
  type: NotificationType;
  createdAt: string;
  actor: NotificationActor;
  folder: NotificationFolder;
  isRead: boolean;
  title: string;
  message: string;
}

// Request payloads for notification-related operations

export interface IBaseNotificationPayload {
  notificationId: string;
}

export interface IGetNotificationsParam {
  page?: number;
  limit?: number;
}

// Response objects for notification-related operations

export interface INotificationsResponse {
  notifications: INotification[];
  meta: {
    unreadCount: number;
    totalCount: number;
    currentPage: number;
  };
}
