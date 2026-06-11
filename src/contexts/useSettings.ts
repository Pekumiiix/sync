import { inject, type InjectionKey, type Ref } from 'vue';

import type { ISettingsResponse } from '@/types/settings.type';

export interface SettingsContext {
  settings: Ref<ISettingsResponse | undefined>;
  isLoading: Ref<boolean>;
  isError: Ref<boolean>;
  isSuccess: Ref<boolean>;
}

export const SETTINGS_KEY = Symbol('UserSettings') as InjectionKey<SettingsContext>;

export function useSettings() {
  const context = inject(SETTINGS_KEY);

  if (!context) {
    throw new Error('useSettings must be used within a <SettingsProvider>');
  }

  return context;
}
