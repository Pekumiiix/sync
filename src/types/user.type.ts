export interface UserSettingsResponse {
  autoMergeDuplicate: boolean;
  notification: {
    notifyOnNewMember: boolean;
    notifyOnNewBookmark: boolean;
  };
  sync: {
    frequency: string;
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
  plan: string;
  createdAt: string;
  updatedAt: string;
  settings: UserSettingsResponse;
}
