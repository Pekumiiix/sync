import type { IApiResponse } from '@/types/api.type';
import type { IChangeMemberAccessLevelPayload, IKickMemberPayload } from '@/types/member.type';
import { apiClient } from '@/utils/apiUtils';

class MemberService {
  changeMemberAccessLevel(payload: IChangeMemberAccessLevelPayload) {
    const { accessLevel, memberId } = payload;

    return apiClient<IApiResponse>('patch', `/members/${memberId}/access-level`, { accessLevel });
  }

  kickMember(payload: IKickMemberPayload) {
    const { memberId } = payload;

    return apiClient<IApiResponse>('delete', `/members/${memberId}`);
  }
}

export const memberService = new MemberService();
