import type { IApiResponse } from '@/types/api.type';
import type {
  IDisconnectBrowserIntegrationPayload,
  IGetBrowserIntegrationsResponse
} from '@/types/browser-integration.type';
import { apiClient } from '@/utils/apiUtils';

class BrowserIntegrationService {
  getBrowserIntegrations() {
    return apiClient<IApiResponse<IGetBrowserIntegrationsResponse>>('get', '/browser-integrations');
  }

  disconnectBrowserIntegration(payload: IDisconnectBrowserIntegrationPayload) {
    return apiClient<IApiResponse>('delete', `/browser-integrations/${payload.integrationId}`);
  }
}

export const browserIntegrationService = new BrowserIntegrationService();
