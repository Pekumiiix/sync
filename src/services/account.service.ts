import type {
  IAccountResponse,
  IUpdateProfilePayload,
  IUpdateSettingsPayload
} from '@/types/account.type';
import type { IApiResponse } from '@/types/api.type';
import { apiClient } from '@/utils/apiUtils';

class AccountService {
  getProfile() {
    return apiClient<IApiResponse<IAccountResponse>>('get', '/account/profile');
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
}

export const accountService = new AccountService();
