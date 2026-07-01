import type { BrowserProvider } from './app.type';

// Core models

interface Integration {
  id: string;
  browser: BrowserProvider;
  lastSyncedAt: string;
  createdAt: string;
  deviceName: string | null;
  extensionVersion: string | null;
}

// Request payloads for browser-integration operations

export interface IDisconnectBrowserIntegrationPayload {
  integrationId: string;
}

// Response objects for browser-intergration operations

export interface IGetBrowserIntegrationsResponse {
  integrations: Integration[];
}
