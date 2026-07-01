import type { FolderId } from './folder.type';
import type { MemberAccessLevel } from './member.type';

// Core models

export type InvitationStatus = 'pending' | 'accepted' | 'declined' | 'expired';

export interface Invitation {
  id: string;
  folderId: string;
  token: string;
  createdAt: string;
  status: InvitationStatus;
  inviter: {
    id: string;
    avatarUrl: string | null;
    firstName: string;
    lastName: string;
  };
  folder: {
    id: string;
    name: string;
    isProtected: boolean;
    recentBookmarkImages: string[];
  };
}

// Request payloads for invitation-related operations
export interface IBaseInvitationPayload {
  token: string;
}

export interface ICreateInvitationPayload {
  folderId: FolderId;
  accessLevel: MemberAccessLevel;
  email: string;
}

// Response objects for invitation-related operations
export interface IInvitationResponse {
  invitation: Invitation;
}

export interface IGetInvitationsResponse {
  pendingInvitations: Invitation[];
  resolvedInvitations: Invitation[];
}
