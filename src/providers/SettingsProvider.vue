<script setup lang="ts">
import { provide, ref } from 'vue';

import { SETTINGS_KEY } from '@/contexts/useSettings';
import { mockUserSettingsResponse } from '@/mock-data/settings';
import type { ISettingsResponse } from '@/types/settings.type';

const settings = ref<ISettingsResponse>(mockUserSettingsResponse);
const isLoading = ref(false);
const isError = ref(false);
const isSuccess = ref(true);

provide(SETTINGS_KEY, {
  settings,
  isLoading,
  isError,
  isSuccess
});
</script>

<template>
  <slot />
</template>
