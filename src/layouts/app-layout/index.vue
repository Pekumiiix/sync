<script setup lang="ts">
import { RouterView } from 'vue-router';

import { SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from './sections';
</script>

<template>
  <SidebarProvider class="w-full min-h-screen flex justify-center">
    <AppSidebar />

    <main class="flex-1 max-w-384 min-w-0 min-h-screen flex flex-col">
      <RouterView />
    </main>
  </SidebarProvider>
</template>
