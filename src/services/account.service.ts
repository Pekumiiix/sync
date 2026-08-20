import type {
  IAccountResponse,
  IDisconnectOAuthIdentityPayload,
  IOAuthIdentitiesResponse,
  IUpdateProfilePayload,
  IUpdateSettingsPayload
} from '@/types/account.type';
import type { IApiResponse } from '@/types/api.type';
import { apiClient } from '@/utils/apiUtils';

class AccountService {
  getProfile() {
    return apiClient<IApiResponse<IAccountResponse>>('get', '/account/profile');
  }

  getOAuthIdentities() {
    return apiClient<IApiResponse<IOAuthIdentitiesResponse>>('get', '/account/oauths');
  }

  updateProfile(payload: IUpdateProfilePayload) {
    return apiClient<IApiResponse<IAccountResponse>, IUpdateProfilePayload>(
      'patch',
      '/account/profile',
      payload
    );
  }

  updateSettings(payload: IUpdateSettingsPayload) {
    return apiClient<IApiResponse<IAccountResponse>, IUpdateSettingsPayload>(
      'patch',
      '/account/settings',
      payload
    );
  }

  disconnectOAuthIdentity(payload: IDisconnectOAuthIdentityPayload) {
    return apiClient<IApiResponse<IOAuthIdentitiesResponse>>(
      'delete',
      `/account/oauth/${payload.provider}`
    );
  }
}

export const accountService = new AccountService();
