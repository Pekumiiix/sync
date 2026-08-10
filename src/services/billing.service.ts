import type { IApiResponse } from '@/types/api.type';
import type { ICheckoutPayload, ICheckoutResponse } from '@/types/billing.type';
import { apiClient } from '@/utils/apiUtils';

class BillingService {
  checkout(payload: ICheckoutPayload) {
    return apiClient<IApiResponse<ICheckoutResponse>>('post', '/billing/checkout', payload);
  }

  cancelSubscription() {
    return apiClient<IApiResponse>('delete', '/billing/cancel-subscription');
  }
}

export const billingService = new BillingService();
