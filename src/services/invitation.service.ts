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
    const { token } = payload;

    return apiClient<IApiResponse<IInvitationResponse>>('post', `/invitations/${token}/accept`);
  }

  declineInvitation(payload: IBaseInvitationPayload) {
    const { token } = payload;

    return apiClient<IApiResponse<IInvitationResponse>>('post', `/invitations/${token}/decline`);
  }
}

export const invitationService = new InvitationService();
