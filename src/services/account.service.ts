import type { IAccountResponse, IUpdateProfilePayload } from '@/types/account.type';
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
}

export const accountService = new AccountService();
