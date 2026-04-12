<script setup lang="ts">
import { ref } from 'vue';

import { BaseAvatar, BaseSelect } from '@/components/re-useable';

interface IMembersItemProps {
  avatar_url: string;
  name: string;
  email: string;
  role: 'admin' | 'can_edit' | 'can_view';
}

const props = defineProps<IMembersItemProps>();

const userRole = ref(props.role);
</script>

<template>
  <div
    class="w-full flex items-center justify-between py-5.5 px-6.5 border-b last:border-none border-stroke-1/5"
  >
    <div class="flex items-center gap-2">
      <BaseAvatar
        :src="avatar_url"
        :fallback="name"
        class="size-8"
      />

      <div class="flex flex-col gap-0.5">
        <p class="font-medium leading-5.5 -tracking-[1%] text-black-90">{{ props.name }}</p>
        <p class="text-xs leading-[100%] text-black-70">{{ props.email }}</p>
      </div>

      <p
        v-if="props.role === 'admin'"
        class="text-[10px] leading-[100%] text-[#21620a] py-1.25 px-2.25 rounded-[3px] bg-[#21620A0F] capitalize"
      >
        Admin
      </p>
    </div>

    <BaseSelect
      v-model="userRole"
      :options="[
        { label: 'Admin', value: 'admin' },
        { label: 'Can Edit', value: 'can_edit' },
        { label: 'Can View', value: 'can_view' }
      ]"
      :class-names="{
        trigger: 'h-7.25 flex items-center px-2 bg-[#00000008] rounded-[6px] border-none',
        value: 'text-[11px] leading-[100%]'
      }"
    />
  </div>
</template>
