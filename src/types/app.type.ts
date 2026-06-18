export interface IBrowserConnection {
  provider: BrowserProvider;
  name: string;
  isConnected: boolean;
  connectedAt: string | null;
  lastSyncAt: string | null;
}

export type DisplayType = 'list' | 'grid';

export type SortOrder = 'a-z' | 'z-a' | 'newest' | 'oldest';

export type BrowserProvider = 'chrome' | 'firefox' | 'edge' | 'opera' | 'arc' | 'brave';
