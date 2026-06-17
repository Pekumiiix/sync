import type { IApiResponse } from '@/types/api.type';
import type {
  IBaseInvitationPayload,
  IInvitationDetails,
  IUserInvitationPayload
} from '@/types/invitation.type';
import { apiClient } from '@/utils/apiUtils';

class InvitationService {
  inviteUser(payload: IUserInvitationPayload) {
    const { folderId, ...data } = payload;

    return apiClient<IApiResponse>('post', `/folders/${folderId}/members`, data);
  }

  acceptInvitation(payload: IBaseInvitationPayload) {
    const { token } = payload;

    return apiClient<IApiResponse>('post', `/invitations/${token}/accept`);
  }

  declineInvitation(payload: IBaseInvitationPayload) {
    const { token } = payload;

    return apiClient<IApiResponse>('post', `/invitations/${token}/decline`);
  }

  getInvitationDetails(payload: IBaseInvitationPayload) {
    const { token } = payload;

    return apiClient<IApiResponse<IInvitationDetails>>('get', `/invitations/${token}`);
  }
}

export const invitationService = new InvitationService();
