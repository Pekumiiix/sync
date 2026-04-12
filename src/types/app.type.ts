export interface IBookmarkCard {
  id: string;
  image: string;
  platform: string;
  link: string;
  collection: string;
  time: string;
  isPinned: boolean;
  tags: string[];
  description: string;
}

export interface ITransformedBookmark extends IBookmarkCard {
  isSelected: boolean;
}

export interface IFolderCard {
  id: string;
  name: string;
  updated_at: string;
  item_count: number;
}

export interface ITransformedFolder extends IFolderCard {
  isSelected: boolean;
}

export interface ISelectedBookmark {
  id: string;
  isPinned: boolean;
}

export interface INotificationItem {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  isInvitation: boolean;
}

interface BaseNotification {
  id: string;
  createdAt: string;
  isRead: boolean;
  actor: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  target: {
    id: string;
    name: string;
    type: 'folder' | 'workspace';
  };
}

export interface InfoNotification extends BaseNotification {
  type: 'new_member_joined' | 'new_entry';
}

export interface ActionableNotification extends BaseNotification {
  type: 'member_request' | 'invite_request';
  actionStatus: 'pending' | 'accepted' | 'declined'; // Tracks the button state
}

export type INotification = InfoNotification | ActionableNotification;

export type DisplayType = 'list' | 'grid';
export type SortOrder = 'a-z' | 'z-a' | 'newest' | 'oldest';
