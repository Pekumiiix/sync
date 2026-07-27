<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { BaseAvatar } from '@/components/re-useable';
import { useAuthStore } from '@/stores/auth.store';
import { computeUserName } from '@/utils/stringutils';

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

const fullName = computed(() => computeUserName(user.value?.firstName, user.value?.lastName));
</script>

<template>
  <router-link
    to="/app/settings?tab=account"
    class="w-full h-14.25 flex items-center gap-2 p-3 bg-white rounded-xl border border-black-10"
  >
    <BaseAvatar
      :src="user?.avatarUrl"
      :fallback="fullName"
      class="size-8 shrink-0"
    />

    <div class="flex flex-col gap-0.5">
      <p class="text-sm font-medium leading-6 text-black-100">
        {{ computeUserName(user?.firstName, user?.lastName) }}
      </p>
      <p class="text-xs leading-[100%] text-black-60">{{ user?.email }}</p>
    </div>
  </router-link>
</template>
