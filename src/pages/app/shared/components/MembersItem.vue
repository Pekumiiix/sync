<script setup lang="ts">
import { computed, ref } from 'vue';

import { BaseAvatar, BaseSelect } from '@/components/re-useable';
import { LoadingButton } from '@/components/shared';
import { useChangeMemberAccessLevel, useKickMember } from '@/hooks/useMember';
import { useAuthStore } from '@/stores/auth.store';
import type { MemberAccessLevel, MemberRole } from '@/types/member.type';

interface IMembersItemProps {
  folderId: string;
  memberId: string;
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

const { mutate: kickMember, isPending: isKickingMember } = useKickMember();
const { mutate: updateMemberAccessLevel } = useChangeMemberAccessLevel();

function handleLeaveFolder() {
  kickMember({ folderId: props.folderId, memberId: props.memberId });
}

function handleAccessLevelChange() {
  updateMemberAccessLevel(
    {
      folderId: props.folderId,
      memberId: props.memberId,
      accessLevel: userAccessLevel.value
    },
    {
      onError: () => {
        userAccessLevel.value = props.accessLevel;
      }
    }
  );
}
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

    <div class="flex items-center gap-2">
      <BaseSelect
        v-if="props.accessLevel === 'editor' && !isCurrentUser"
        v-model="userAccessLevel"
        @update:model-value="handleAccessLevelChange"
        :options="[
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' }
        ]"
        :class-names="{
          trigger: 'h-7.25 flex items-center px-2 bg-[#00000008] rounded-[6px] border-none',
          value: 'text-[11px] leading-[100%]'
        }"
      />

      <LoadingButton
        v-if="props.role === 'owner' && !isCurrentUser"
        :is-loading="isKickingMember"
        @click="handleLeaveFolder"
        class="h-9.5 flex items-center text-sm font-medium leading-4.75 text-danger-100 gap-1.75 px-3 py-3.5 rounded-full bg-[#FF2F000A] hover:bg-danger-100/10"
      >
        <LeaveIcon class="stroke-danger-100" />
        Kick
      </LoadingButton>
    </div>
  </div>
</template>
