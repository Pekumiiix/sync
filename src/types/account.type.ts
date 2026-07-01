// Request payload for account related operations

import type { IUser } from './user.type';

export interface IUpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  location?: string;
  email?: string;
}

// Response objects for account related operations

export interface IAccountResponse {
  user: IUser;
}
