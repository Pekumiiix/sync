<script setup lang="ts">
import { cn } from '@/lib/utils';
</script>

<template>
  <section
    :class="cn('w-full flex flex-col items-center gap-16 py-25 md:py-37.5 px-4 md:px-15 xl:px-30')"
  >
    <slot />
  </section>
</template>
