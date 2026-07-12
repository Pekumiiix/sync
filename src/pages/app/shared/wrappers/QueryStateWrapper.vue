<script setup lang="ts">
import { TriangleAlert } from 'lucide-vue-next';

import { LoadingButton } from '@/components/shared';

import { EmptyState } from '../query-states';

interface Props {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  loadingTitle?: string;
  errorTitle?: string;
  errorMessage?: string;
  emptyTitle?: string;
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
  isError: false,
  isEmpty: false,
  loadingTitle: 'Loading...',
  errorTitle: 'Something went wrong',
  errorMessage: 'We couldn’t fetch the data. Please try again.',
  emptyTitle: 'No items found'
});

const emit = defineEmits<{
  (e: 'retry'): void;
}>();
</script>

<style scoped>
@keyframes logoFill {
  0% {
    clip-path: inset(100% 0 0 0);
  }
  80% {
    clip-path: inset(0 0 0 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}

.animate-logo-fill {
  animation: logoFill 1.5s ease-in-out infinite;
}
</style>

<template>
  <div
    v-if="isError"
    class="w-full py-5 flex flex-col items-center justify-center text-center px-4 gap-6"
  >
    <slot
      name="error"
      :retry="() => emit('retry')"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="size-12 rounded-full bg-[#FF2F000A] flex items-center justify-center">
          <TriangleAlert class="size-6 text-danger-100" />
        </div>

        <div class="flex flex-col items-center gap-2">
          <h3 class="text-lg font-medium leading-6 text-black-90 -tracking-[1%]">
            {{ errorTitle }}
          </h3>
          <p class="text-base leading-[120%] text-black-70 max-w-sm">
            {{ errorMessage }}
          </p>
        </div>
      </div>

      <LoadingButton
        :is-loading="isLoading"
        @click="emit('retry')"
        class="h-10 px-5 flex items-center justify-center text-sm font-medium rounded-full"
      >
        Try Again
      </LoadingButton>
    </slot>
  </div>

  <div
    v-else-if="isLoading"
    class="size-full flex items-center justify-center"
  >
    <slot name="loading">
      <div class="w-full min-h-30 h-fit flex flex-col items-center justify-center">
        <div class="max-w-65 w-full flex flex-col gap-3 items-center">
          <div class="relative size-10">
            <img
              src="/images/app/app-logo.png"
              alt="Logo"
              class="absolute inset-0 size-full opacity-20 grayscale"
            />

            <img
              src="/images/app/app-logo.png"
              alt="Logo"
              class="absolute inset-0 size-full animate-logo-fill"
            />
          </div>

          <p class="text-lg text-center font-medium leading-7 text-black-90 -tracking-[1%]">
            {{ loadingTitle }}
          </p>
        </div>
      </div>
    </slot>
  </div>

  <div
    v-else-if="isEmpty"
    class="w-full flex flex-col items-center justify-center text-center"
  >
    <slot name="empty">
      <EmptyState :title="emptyTitle" />
    </slot>
  </div>

  <slot v-else />
</template>
