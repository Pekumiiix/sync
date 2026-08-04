import { useMutation } from '@tanstack/vue-query';

import { billingService } from '@/services/billing.service';
import type { ICheckoutPayload } from '@/types/billing.type';

export function useCheckout() {
  return useMutation({
    mutationFn: (payload: ICheckoutPayload) => billingService.checkout(payload),
    onSuccess: (response) => {
      window.location.href = response.data.url;
    }
  });
}
