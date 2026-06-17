import type { FolderId } from './folder.type';

export interface IInvitationFolder {
  id: string;
  name: string;
  images: string[];
  isPasswordProtected: boolean;
}

export interface IInvitationInviter {
  name: string;
  avatarUrl: string | null;
}

export interface IInvitationDetails {
  token: string;
  invitedAt: string;
  folder: IInvitationFolder;
  inviter: IInvitationInviter;
}

export interface IBaseInvitationPayload {
  token: string;
}

export interface IUserInvitationPayload {
  email: string;
  folderId: FolderId;
  access: 'editor' | 'viewer';
}
