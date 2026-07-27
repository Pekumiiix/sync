import type { TSyncFrequency } from '@/types/settings.type';

export interface UserSettingsResponse {
  management: {
    autoMergeDuplicate: boolean;
  };
  notification: {
    notifyOnNewMember: boolean;
    notifyOnNewBookmark: boolean;
  };
  sync: {
    frequency: TSyncFrequency;
  };
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  location: string | null;
  avatarUrl: string | null;
  plan: 'free' | 'standard' | 'basic';
  createdAt: string;
  updatedAt: string;
  settings: UserSettingsResponse;
}
