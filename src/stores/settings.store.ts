import { ref } from 'vue';
import { defineStore } from 'pinia';

import { mockUserSettingsResponse } from '@/mock-data/settings';
import type { ISettingsResponse } from '@/types/settings.type';

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<ISettingsResponse>(mockUserSettingsResponse);
  const isLoading = ref(false);
  const isError = ref(false);
  const isSuccess = ref(true);

  return {
    settings,
    isLoading,
    isError,
    isSuccess
  };
});
