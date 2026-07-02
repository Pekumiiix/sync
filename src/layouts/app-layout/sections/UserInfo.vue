<script setup lang="ts">
import { BaseAvatar } from '@/components/re-useable';
import { useAuthStore } from '@/stores/auth.store';

const { user } = useAuthStore();
</script>

<template>
  <router-link
    to="/app/settings?tab=account"
    class="w-full h-14.25 flex items-center gap-2 p-3 bg-white rounded-xl border border-black-10"
  >
    <BaseAvatar
      :src="user?.avatarUrl"
      :fallback="`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`"
      class="size-8 shrink-0"
    />

    <div class="flex flex-col gap-0.5">
      <p class="text-sm font-medium leading-6 text-black-100">
        {{ user?.firstName }} {{ user?.lastName }}
      </p>
      <p class="text-xs leading-[100%] text-black-60">{{ user?.email }}</p>
    </div>
  </router-link>
</template>
