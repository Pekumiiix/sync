<script setup lang="ts">
import { RouterView } from 'vue-router';

import Cta from './sections/Cta.vue';
import Faq from './sections/Faq.vue';
import MarketingFooter from './sections/MarketingFooter.vue';
import MarketingNav from './sections/MarketingNav.vue';
</script>

<template>
  <header class="absolute top-17.5 w-full flex items-center justify-center px-4 md:px-15 lg:px-30">
    <MarketingNav />
  </header>

  <main class="w-full flex flex-col items-center">
    <RouterView />

    <Faq />

    <Cta />
  </main>

  <MarketingFooter />
</template>
