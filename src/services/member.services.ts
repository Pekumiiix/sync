import type { IApiResponse } from '@/types/api.type';
import type {
  IChangeMemberAccessLevelPayload,
  IFolderMembersPayload,
  IFolderMembersResponse,
  IKickMemberPayload,
  IMemberResponse
} from '@/types/member.type';
import { apiClient } from '@/utils/apiUtils';

class MemberService {
  getFolderMembers(payload: IFolderMembersPayload) {
    const { folderId } = payload;

    return apiClient<IApiResponse<IFolderMembersResponse>>('get', `/folders/${folderId}/members`);
  }

  changeMemberAccessLevel(payload: IChangeMemberAccessLevelPayload) {
    const { accessLevel, memberId, folderId } = payload;

    return apiClient<IApiResponse<IMemberResponse>>(
      'patch',
      `/folders/${folderId}/member/${memberId}/`,
      { accessLevel }
    );
  }

  kickMember(payload: IKickMemberPayload) {
    const { memberId, folderId } = payload;

    return apiClient<IApiResponse>('delete', `/folders/${folderId}/members/${memberId}`);
  }

  leaveFolder(payload: IFolderMembersPayload) {
    const { folderId } = payload;

    return apiClient<IApiResponse>('delete', `/folders/${folderId}/members/leave`);
  }
}

export const memberService = new MemberService();
