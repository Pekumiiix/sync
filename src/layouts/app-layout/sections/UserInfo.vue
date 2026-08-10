<script setup lang="ts">
import { computed } from 'vue';
import { ChevronsUpDown, LogOut } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

import { SettingsIcon } from '@/components/icons';
import { BaseAvatar } from '@/components/re-useable';
import { BasePopover } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth.store';
import { computeUserName, truncateString } from '@/utils/stringutils';

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

const { signOut } = authStore;

const fullName = computed(() => computeUserName(user.value?.firstName, user.value?.lastName));
</script>

<template>
  <BasePopover :classNames="{ content: 'w-[calc(100%-24px)] min-w-52 p-1' }">
    <template #trigger>
      <Button
        class="w-full h-14.25 flex items-center justify-between gap-2 p-3 bg-white rounded-xl border border-black-10 text-left hover:bg-black-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
      >
        <div class="w-fit flex items-center gap-2 overflow-hidden">
          <BaseAvatar
            :src="user?.avatarUrl"
            :fallback="fullName"
            class="size-8 shrink-0"
          />

          <div class="flex flex-col overflow-hidden">
            <p class="text-sm font-medium leading-6 text-black-100 truncate">
              {{ fullName }}
            </p>
            <p class="text-xs text-black-60 truncate">
              {{ truncateString(user?.email || '', 15) }}
            </p>
          </div>
        </div>
        <div class="size-fit h-full flex flex-col gap-1.25 items-center justify-center shrink-0">
          <ChevronsUpDown class="size-4 text-black-60" />
        </div>
      </Button>
    </template>

    <div class="flex flex-col">
      <router-link
        :to="{ name: 'Settings', params: { tab: 'account' } }"
        class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-black-100 rounded-md hover:bg-black-5 transition-colors"
      >
        <SettingsIcon class="size-4 text-black-60" />
        Account settings
      </router-link>

      <div class="h-px bg-black-10 my-1 mx-1" />

      <Button
        @click="() => signOut.mutate()"
        variant="ghost"
        class="flex items-center justify-start gap-2 px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:text-red-600 hover:bg-red-50 transition-colors w-full text-left"
      >
        <LogOut class="size-4" />
        {{ signOut.isPending ? 'Signing out...' : 'Sign out' }}
      </Button>
    </div>
  </BasePopover>
</template>
