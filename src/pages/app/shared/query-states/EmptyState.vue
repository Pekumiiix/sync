<script lang="ts" setup>
interface Props {
  title: string;
}

defineProps<Props>();
</script>

<template>
  <div class="w-full h-86.25 flex flex-col items-center justify-center gap-5 py-5 px-3">
    <div class="flex flex-col items-center gap-4">
      <img
        src="/images/app/bookmarks/empty-bookmarks.png"
        alt="Snooze"
        class="size-18.75"
      />
      <p class="text-center text-lg font-inter leading-[160%] text-black-90">
        {{ title }}
      </p>
    </div>

    <slot />
  </div>
</template>
