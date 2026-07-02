<script setup lang="ts">
import { getBrowserImage } from '@/components/constants/browsers';
import { LoadingButton } from '@/components/shared';
import { useDisconnectBrowserIntegration } from '@/hooks/useBrowserIntegration';
import type { Integration } from '@/types/browser-integration.type';
import { timeAgo } from '@/utils/dateUtils';

defineProps<{
  integrations?: Integration[];
  isLoading: boolean;
}>();

const { mutate, isPending } = useDisconnectBrowserIntegration();

function handleDisconnectBrowser(integrationId: string) {
  mutate({ integrationId });
}
</script>

<template>
  <div
    v-for="integration in integrations || []"
    :key="integration.id"
    class="w-full h-14.5 flex items-center justify-between px-4 py-3.25 rounded-full bg-[#F9F9FB]"
  >
    <div class="flex items-center gap-1.75">
      <img
        :src="getBrowserImage(integration.browser)"
        :alt="integration.browser"
        class="size-8 rounded-full"
      />

      <div class="flex flex-col gap-1">
        <p class="text-sm font-medium text-black-90 leading-4">{{ integration.browser }}</p>
        <p
          v-if="integration.createdAt"
          class="text-xs leading-[100%] text-black-70"
        >
          Connected {{ timeAgo(integration.createdAt) }}
        </p>
      </div>
    </div>

    <LoadingButton
      :isLoading="isPending"
      @click="() => handleDisconnectBrowser(integration.id)"
      variant="outline"
      class="w-18.25 h-6.75 text-[9px] text-black-90 font-medium leading-9.25 py-1.75 px-3 border-black-30 rounded-full bg-transparent"
      loader-class="size-4"
    >
      <span>Disconnect</span>
    </LoadingButton>
  </div>
</template>
