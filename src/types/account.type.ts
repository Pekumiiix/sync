// Request payload for account related operations

import type { TSyncFrequency } from './app.type';
import type { IUser } from './user.type';

export type OAuthProviders = 'google';
export interface IOAuthIdentity {
  provider: OAuthProviders;
  id: string;
  createdAt: string;
}

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
  password?: string;
}

export interface IDisconnectOAuthIdentityPayload {
  provider: OAuthProviders;
}

// Response objects for account related operations

export interface IAccountResponse {
  user: IUser;
}

export interface IOAuthIdentitiesResponse {
  identities: IOAuthIdentity[];
}
