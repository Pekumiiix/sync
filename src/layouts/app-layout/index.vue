<script setup lang="ts">
import { RouterView } from 'vue-router';

import { FullScreenLoader } from '@/components/shared';
import { SidebarProvider } from '@/components/ui/sidebar';
import { QueryStateWrapper } from '@/pages/app/shared/wrappers';
import { useAuthStore } from '@/stores/auth.store';

import { AppSidebar } from './sections';

const authStore = useAuthStore();
</script>

<template>
  <QueryStateWrapper :isLoading="authStore.isLoading">
    <SidebarProvider class="w-full min-h-screen flex justify-center">
      <AppSidebar />

      <main class="flex-1 max-w-384 min-w-0 min-h-screen flex flex-col">
        <RouterView />
      </main>
    </SidebarProvider>

    <template #loading>
      <FullScreenLoader />
    </template>
  </QueryStateWrapper>
</template>
