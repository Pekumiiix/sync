<script setup lang="ts">
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
  emptyTitle: 'No items found',
  emptyMessage: 'There is nothing to display here right now.'
});
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
    class="w-full py-12 flex flex-col items-center justify-center text-center"
  >
    <slot name="error">
      <h3 class="text-lg font-semibold text-danger-100">{{ errorTitle }}</h3>
      <p class="text-sm text-muted-foreground mt-1">{{ errorMessage }}</p>
    </slot>
  </div>

  <div
    v-else-if="isLoading"
    class="size-full"
  >
    <slot name="loading">
      <div class="size-full flex flex-col items-center justify-center">
        <div class="max-w-65 w-full flex flex-col gap-3 items-center">
          <div class="relative size-12">
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

          <div class="flex flex-col items-center gap-1">
            <p class="text-[22px] text-center font-medium leading-7 text-black-90 -tracking-[1%]">
              {{ loadingTitle }}
            </p>
            <!-- <p class="text-base leading-[120%] text-black-80 text-center">
              {{ loadingMessage }}
            </p> -->
          </div>
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
