import { useMutation } from '@tanstack/vue-query';

import { billingService } from '@/services/billing.service';
import type { ICheckoutPayload } from '@/types/billing.type';
import { toaster } from '@/utils/toastUtils';

export function useCheckout() {
  return useMutation({
    mutationFn: (payload: ICheckoutPayload) => billingService.checkout(payload),
    onSuccess: (response) => {
      window.location.href = response.data.url;
    }
  });
}

export function useCancelSubscription() {
  return useMutation({
    mutationFn: () => billingService.cancelSubscription(),
    onSuccess: () => {
      toaster.success('Subscription cancelled successfully.');
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}
