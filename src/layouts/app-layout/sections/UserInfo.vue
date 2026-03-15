<script setup lang="ts">
import BaseAvatar from '@/components/re-useable/BaseAvatar.vue';
</script>

<template>
  <div
    class="w-full h-14.25 flex items-center gap-2 p-3 bg-white rounded-xl border border-black-10"
  >
    <BaseAvatar
      src="/images/app/sidebar/avatar.png"
      fallback="PA"
      class="size-8 shrink-0"
    />

    <div class="flex flex-col gap-0.5">
      <p class="text-sm font-medium leading-6 text-black-100">Pelumi Amao</p>
      <p class="text-xs leading-[100%] text-black-60">Pelumiamao@gmail.com</p>
    </div>
  </div>
</template>
