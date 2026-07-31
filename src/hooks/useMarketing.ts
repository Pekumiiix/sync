import { useMutation } from '@tanstack/vue-query';

import { marketingService } from '@/services/marketing.service';
import type { IContactPayload } from '@/types/marketing.type';

export function useContactUs() {
  return useMutation({
    mutationFn: (payload: IContactPayload) => marketingService.contact(payload)
  });
}
