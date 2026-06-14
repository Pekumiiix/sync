import type { IBrowserConnection } from './app.type';

export type TSyncFrequency = 'immediate' | '3_hours' | '6_hours' | '12_hours';

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
