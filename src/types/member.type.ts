export type SystemRole = 'admin' | 'member' | 'guest';

export type FolderAccessLevel = 'owner' | 'editor' | 'viewer';

export interface IFolderMember {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  systemRole: SystemRole;
  accessLevel: FolderAccessLevel;
  canEditAccess: boolean;
}

export interface IFolderMembersResponse {
  folder: {
    id: string;
    name: string;
  };
  data: IFolderMember[];
  meta: {
    totalCount: number;
  };
}

export interface IChangeMemberAccessLevelPayload {
  accessLevel: FolderAccessLevel;
  memberId: string;
}

export interface IKickMemberPayload {
  memberId: string;
}
