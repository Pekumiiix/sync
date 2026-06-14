<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

import { SidebarProvider } from '@/components/ui/sidebar';
import { mockPendingInvitation } from '@/mock-data/invitation';
import { JoinWorkSpaceDialog } from '@/pages/app/shared/dialogs';

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

    <JoinWorkSpaceDialog
      v-if="pendingInviteToken"
      v-model="isInviteDialogOpen"
      :token="mockPendingInvitation.token"
      :folder="mockPendingInvitation.folder"
      :inviter="mockPendingInvitation.inviter"
      :invited-at="mockPendingInvitation.invitedAt"
    />

    <main class="flex-1 max-w-384 min-w-0 min-h-screen flex flex-col">
      <RouterView />
    </main>
  </SidebarProvider>
</template>
