export interface IBrowserConnection {
  provider: BrowserProvider;
  name: string;
  isConnected: boolean;
  connectedAt: string | null;
  lastSyncAt: string | null;
}

export type DisplayType = 'list' | 'grid';

export type SortOrder = 'title_desc' | 'title_asc' | 'newest' | 'oldest';

export type BrowserProvider =
  | 'chrome'
  | 'firefox'
  | 'edge'
  | 'opera'
  | 'arc'
  | 'brave'
  | 'safari'
  | 'manual'
  | 'other';
