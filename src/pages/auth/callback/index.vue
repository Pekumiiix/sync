<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AlertCircle } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';

const route = useRoute();
const router = useRouter();

const errorMessage = ref<string | null>(null);
const isProcessing = ref(true);

function getErrorMessage(code: string): string {
  switch (code) {
    case 'access_denied':
      return 'Sign-in was cancelled or access was denied.';
    case 'auth_failed':
      return 'Authentication failed on the server. Please try again.';
    default:
      return 'An error occurred during authentication.';
  }
}

onMounted(() => {
  const token = route.query.token as string | undefined;
  const error = route.query.error as string | undefined;

  if (error) {
    isProcessing.value = false;
    errorMessage.value = getErrorMessage(error);

    return;
  }

  if (!token) {
    isProcessing.value = false;
    errorMessage.value = 'Authentication failed: No access token was provided.';

    return;
  }

  router.replace({ name: 'All Bookmarks' });
});

function handleRetry() {
  router.replace({ name: 'Sign In' });
}
</script>

<template>
  <div class="size-full flex flex-col items-center justify-center bg-gray-50 px-4">
    <div
      class="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-100 text-center"
    >
      <div
        v-if="isProcessing"
        class="flex flex-col items-center gap-4"
      >
        <div class="relative size-12">
          <img
            src="/images/app/app-logo.png"
            alt="Sync Logo"
            class="absolute inset-0 size-full opacity-20 grayscale"
          />

          <img
            src="/images/app/app-logo.png"
            alt="Sync Logo"
            class="absolute inset-0 size-full animate-logo-fill"
          />
        </div>
        <div class="space-y-1">
          <h2 class="text-lg font-semibold text-gray-900">Completing sign in</h2>
          <p class="text-sm text-gray-500">Please wait while we verify your credentials...</p>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center gap-4"
      >
        <div class="flex size-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertCircle class="size-6" />
        </div>
        <div class="space-y-1">
          <h2 class="text-lg font-semibold text-gray-900">Authentication Error</h2>
          <p class="text-sm text-gray-600">{{ errorMessage }}</p>
        </div>
        <Button
          class="mt-2 w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          @click="handleRetry"
        >
          Return to Sign In
        </Button>
      </div>
    </div>
  </div>
</template>
