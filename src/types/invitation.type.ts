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
