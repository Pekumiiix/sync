import type { RouteRecordInfo } from 'vue-router';

import 'vue-router';

export interface RouteNamedMap {
  // --- Marketing Routes ---
  Homepage: RouteRecordInfo<
    'Homepage',
    '/',
    Record<never, never>,
    Record<never, never>,
    'Home' | 'Pricing'
  >;
  Home: RouteRecordInfo<'Home', '/', Record<never, never>, Record<never, never>, never>;
  Pricing: RouteRecordInfo<
    'Pricing',
    '/pricing',
    Record<never, never>,
    Record<never, never>,
    never
  >;

  // --- Auth Routes ---
  Auth: RouteRecordInfo<
    'Auth',
    '/auth',
    Record<never, never>,
    Record<never, never>,
    'Sign In' | 'Sign Up' | 'Forgot Password' | 'Reset Password' | 'Verify Email'
  >;
  'Sign In': RouteRecordInfo<
    'Sign In',
    '/auth/sign-in',
    Record<never, never>,
    Record<never, never>,
    never
  >;
  'Sign Up': RouteRecordInfo<
    'Sign Up',
    '/auth/sign-up',
    Record<never, never>,
    Record<never, never>,
    never
  >;
  'Forgot Password': RouteRecordInfo<
    'Forgot Password',
    '/auth/forgot-password',
    Record<never, never>,
    Record<never, never>,
    never
  >;
  'Reset Password': RouteRecordInfo<
    'Reset Password',
    '/auth/reset-password',
    Record<never, never>,
    Record<never, never>,
    never
  >;
  'Verify Email': RouteRecordInfo<
    'Verify Email',
    '/auth/verify-email',
    Record<never, never>,
    Record<never, never>,
    never
  >;
  Callback: RouteRecordInfo<
    'Callback',
    '/auth/callback',
    Record<never, never>,
    Record<never, never>,
    never
  >;

  // --- App Routes ---
  App: RouteRecordInfo<
    'App',
    '/app',
    Record<never, never>,
    Record<never, never>,
    'All Bookmarks' | 'Settings' | 'Bookmark Folder' | 'Members' | 'Not Found'
  >;
  'All Bookmarks': RouteRecordInfo<
    'All Bookmarks',
    '/app/all-bookmarks',
    Record<never, never>,
    Record<never, never>,
    never
  >;
  Settings: RouteRecordInfo<
    'Settings',
    '/app/settings',
    Record<never, never>,
    Record<never, never>,
    never
  >;
  'Bookmark Folder': RouteRecordInfo<
    'Bookmark Folder',
    '/app/:folderId',
    { folderId: string | number },
    { folderId: string },
    never
  >;
  Members: RouteRecordInfo<
    'Members',
    '/app/:folderId/members',
    { folderId: string | number },
    { folderId: string },
    never
  >;
  'Not Found': RouteRecordInfo<
    'Not Found',
    '/app/:pathMatch(.*)*',
    { pathMatch?: Array<string | number> },
    { pathMatch: string[] },
    never
  >;
}

declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap;
  }
}
