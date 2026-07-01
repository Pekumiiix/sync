import type { FolderId, IFolderPermission } from './folder.type';

export type MemberRole = 'editor' | 'viewer';
export type MemberAccessLevel = 'member' | 'viewer';

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
  member: {
    id: string;
    role: MemberRole;
    accessLevel: MemberAccessLevel;
    folderId: string;
    user: {
      firstName: string;
      lastName: string;
      avatarUrl: string | null;
    };
  };
}

export interface IFolderMembersResponse {
  members: IMemberResponse[];
  permission: IFolderPermission;
  meta: { totalMemberCount: number };
}
