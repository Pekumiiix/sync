<script setup lang="ts">
import { computed, ref } from 'vue';

import { BaseAvatar, BaseSelect } from '@/components/re-useable';
import { useAuthStore } from '@/stores/auth.store';
import type { MemberAccessLevel, MemberRole } from '@/types/member.type';

interface IMembersItemProps {
  avatar_url: string | null;
  name: string;
  email: string;
  role: MemberRole;
  accessLevel: MemberAccessLevel;
}

const props = defineProps<IMembersItemProps>();

const userAccessLevel = ref(props.accessLevel);

const isCurrentUser = computed(() => {
  const authStore = useAuthStore();

  return props.email === authStore.user?.email;
});
</script>

<template>
  <div
    class="w-full flex items-center justify-between py-5.5 px-6.5 border-b last:border-none border-stroke-1/5"
  >
    <div class="flex flex-row items-center gap-2">
      <BaseAvatar
        :src="avatar_url"
        :fallback="name"
        class="size-8"
      />

      <div class="flex flex-col gap-0.5">
        <p class="font-medium leading-5.5 -tracking-[1%] text-black-90">{{ props.name }}</p>
        <p class="text-xs leading-[100%] text-black-70">{{ props.email }}</p>
      </div>
    </div>

    <BaseSelect
      v-if="props.accessLevel === 'editor' && !isCurrentUser"
      v-model="userAccessLevel"
      :options="[
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' }
      ]"
      :class-names="{
        trigger: 'h-7.25 flex items-center px-2 bg-[#00000008] rounded-[6px] border-none',
        value: 'text-[11px] leading-[100%]'
      }"
    />
  </div>
</template>
