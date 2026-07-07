import type { FolderId, IFolderPermission } from './folder.type';

export type MemberRole = 'owner' | 'member';
export type MemberAccessLevel = 'editor' | 'viewer';

export interface IMember {
  id: string;
  role: MemberRole;
  accessLevel: MemberAccessLevel;
  folderId: string;
  user: {
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    email: string;
  };
}

// Request payloads for member-related operations

export interface IChangeMemberAccessLevelPayload {
  accessLevel: MemberAccessLevel;
  memberId: string;
  folderId: string;
}

export interface IKickMemberPayload {
  memberId: string;
  folderId: FolderId;
}

export interface IFolderMembersPayload {
  folderId: FolderId;
}

// Response objects for member-related operations

export interface IMemberResponse {
  member: IMember;
}

export interface IFolderMembersResponse {
  folder: {
    id: FolderId;
    name: string;
  };
  members: IMember[];
  permission: IFolderPermission;
  meta: { totalMemberCount: number };
}
