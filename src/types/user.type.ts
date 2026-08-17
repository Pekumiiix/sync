import type { PlanName } from '@/components/constants/pricing-plans';
import type { TSyncFrequency } from '@/types/app.type';

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
  createdAt: string;
  updatedAt: string;
  settings: UserSettingsResponse;
  subscription: {
    plan: PlanName;
    isActive: boolean;
  };
}
