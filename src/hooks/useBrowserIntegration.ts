import { useMutation, useQuery } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { browserIntegrationService } from '@/services/browser-integration.service';
import type { IDisconnectBrowserIntegrationPayload } from '@/types/browser-integration.type';

export function useGetBrowserIntegrations() {
  return useQuery({
    queryKey: QUERY_KEYS.browserIntegration.lists(),
    queryFn: () => browserIntegrationService.getBrowserIntegrations()
  });
}

export function useDisconnectBrowserIntegration() {
  return useMutation({
    mutationFn: (payload: IDisconnectBrowserIntegrationPayload) =>
      browserIntegrationService.disconnectBrowserIntegration(payload)
  });
}
