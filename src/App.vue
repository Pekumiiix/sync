<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useSeoMeta } from '@vueuse/head';

import { Toaster } from '@/components/ui/sonner';

import 'vue-sonner/style.css';

const route = useRoute();

const pageTitle = computed(() => {
  if (route.meta?.seoTitle) return `${route.meta.seoTitle} | Sync`;
  if (route.name) return `${route.name.toString()} | Sync`;
  return 'Sync | Universal bookmark sync, simplified.';
});

const appDescription =
  'Organize your bookmarks collections, sync across all browsers, and collaborate seamlessly with your team in real-time.';

useSeoMeta({
  title: pageTitle,
  description: appDescription,
  themeColor: '#ffffff',

  ogTitle: pageTitle,
  ogDescription: appDescription,
  ogType: 'website',
  ogSiteName: 'Sync',
  ogImage: 'https://yourdomain.com/images/og-image.png',
  ogImageAlt: 'Sync App Dashboard Preview',

  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: appDescription,
  twitterImage: 'https://yourdomain.com/images/og-image.png',
  twitterImageAlt: 'Sync App Dashboard Preview'
  // twitterSite: '@SyncApp',
});
</script>

<template>
  <Toaster />

  <RouterView />
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
