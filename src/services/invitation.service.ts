import type { IApiResponse } from '@/types/api.type';
import type {
  IBaseInvitationPayload,
  ICreateInvitationPayload,
  IGetInvitationsResponse,
  IInvitationResponse
} from '@/types/invitation.type';
import { apiClient } from '@/utils/apiUtils';

class InvitationService {
  getInvitations() {
    return apiClient<IApiResponse<IGetInvitationsResponse>>('get', '/invitations');
  }

  createInvitationLink(payload: ICreateInvitationPayload) {
    return apiClient<IApiResponse<IInvitationResponse>>('post', '/invitations', payload);
  }

  acceptInvitation(payload: IBaseInvitationPayload) {
    const { token, password } = payload;

    return apiClient<IApiResponse<IInvitationResponse>>('patch', `/invitations/${token}/accept`, {
      password
    });
  }

  declineInvitation(payload: IBaseInvitationPayload) {
    const { token } = payload;

    return apiClient<IApiResponse<IInvitationResponse>>('patch', `/invitations/${token}/decline`);
  }
}

export const invitationService = new InvitationService();
