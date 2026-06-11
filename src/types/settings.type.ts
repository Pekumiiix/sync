export type TBrowserProvider = 'chrome' | 'firefox' | 'edge' | 'opera' | 'arc' | 'brave';

export type TSyncFrequency = 'immediate' | '3_hours' | '6_hours' | '12_hours';

export interface IBrowserConnection {
  provider: TBrowserProvider;
  name: string;
  isConnected: boolean;
  lastSyncAt: string | null;
}

export interface ISettingsResponse {
  connections: IBrowserConnection[];
  preferences: {
    sync: {
      frequency: TSyncFrequency;
    };
    notifications: {
      newMember: boolean;
      newBookmark: boolean;
    };
    bookmark: {
      autoMergeDuplicates: boolean;
    };
  };
  subscription: {
    isPro: boolean;
  };
}
