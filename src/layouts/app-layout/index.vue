<script setup lang="ts">
import { RouterView } from 'vue-router';

import { SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from './sections';
</script>

<template>
  <SidebarProvider class="w-full min-h-screen flex justify-center">
    <AppSidebar />

    <main class="container w-full min-h-screen flex flex-col">
      <RouterView />
    </main>
  </SidebarProvider>
</template>
