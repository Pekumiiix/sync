<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

import { SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from './sections';

const pendingInviteToken = ref<string | null>(null);
const isInviteDialogOpen = ref(false);

onMounted(() => {
  const token = localStorage.getItem('pending_invite');

  if (token) {
    pendingInviteToken.value = token;
    isInviteDialogOpen.value = true;
  }
});
</script>

<template>
  <SidebarProvider class="w-full min-h-screen flex justify-center">
    <AppSidebar />

    <main class="flex-1 max-w-384 min-w-0 min-h-screen flex flex-col">
      <RouterView />
    </main>
  </SidebarProvider>
</template>
