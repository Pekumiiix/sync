import type { IApiResponse } from '@/types/api.type';
import type { IContactPayload } from '@/types/marketing.type';
import { apiClient } from '@/utils/apiUtils';

class MarketingService {
  contact(payload: IContactPayload) {
    return apiClient<IApiResponse, IContactPayload>('post', '/marketing/contact', payload);
  }
}

export const marketingService = new MarketingService();
