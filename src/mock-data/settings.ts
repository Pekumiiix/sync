import type { ISettingsResponse } from '@/types/settings.type';

export const mockUserSettingsResponse: ISettingsResponse = {
  connections: [
    {
      provider: 'chrome',
      name: 'Google Chrome',
      isConnected: true,
      lastSyncAt: new Date().toISOString(),
      connectedAt: new Date().toISOString()
    },
    {
      provider: 'firefox',
      name: 'Mozilla Firefox',
      isConnected: true,
      lastSyncAt: new Date().toISOString(),
      connectedAt: new Date().toISOString()
    },
    {
      provider: 'edge',
      name: 'Microsoft Edge',
      isConnected: true,
      lastSyncAt: new Date().toISOString(),
      connectedAt: new Date().toISOString()
    },
    {
      provider: 'opera',
      name: 'Opera',
      isConnected: true,
      lastSyncAt: new Date().toISOString(),
      connectedAt: new Date().toISOString()
    },
    {
      provider: 'arc',
      name: 'Arc',
      isConnected: true,
      lastSyncAt: new Date().toISOString(),
      connectedAt: new Date().toISOString()
    },
    {
      provider: 'brave',
      name: 'Brave',
      isConnected: true,
      lastSyncAt: new Date().toISOString(),
      connectedAt: new Date().toISOString()
    }
  ],
  subscription: {
    isPro: false
  },
  preferences: {
    sync: {
      frequency: '3_hours'
    },
    notifications: {
      newMember: true,
      newBookmark: true
    },
    bookmark: {
      autoMergeDuplicates: true
    }
  }
};
