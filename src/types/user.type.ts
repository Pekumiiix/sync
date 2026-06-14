import type { IBrowserConnection } from './app.type';

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  location: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  plan: 'free' | 'basic' | 'standard';
  integrations: IBrowserConnection[];
}
