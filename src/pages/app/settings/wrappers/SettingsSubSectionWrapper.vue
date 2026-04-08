<script setup lang="ts">
interface Props {
  title: string;
  description: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex justify-between gap-9 pt-10 border-t border-stroke-1/10">
    <div class="min-w-fit flex flex-col gap-1">
      <p class="text-base font-medium leading-5.5 text-black-90 -tracking-[1%]">{{ title }}</p>
      <p class="text-sm text-black-60 leading-4.5">{{ description }}</p>
    </div>

    <slot />
  </div>
</template>
