// Request payload for account related operations

import type { TSyncFrequency } from './settings.type';
import type { IUser } from './user.type';

export interface IUpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  location?: string;
  avatarUrl?: string;
}

export interface IUpdateSettingsPayload {
  notifyOnNewMember?: boolean;
  notifyOnNewBookmark?: boolean;
  autoMergeDuplicate?: boolean;
  frequency?: TSyncFrequency;
}

// Response objects for account related operations

export interface IAccountResponse {
  user: IUser;
}
