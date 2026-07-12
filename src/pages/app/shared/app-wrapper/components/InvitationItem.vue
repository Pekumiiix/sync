<script setup lang="ts">
import { BaseAvatar } from '@/components/re-useable';
import { LoadingButton } from '@/components/shared';
import { useAcceptInvitation, useDeclineInvitation } from '@/hooks/useInvitation';
import { cn } from '@/lib/utils';
import type { Invitation, InvitationStatus } from '@/types/invitation.type';
import { timeAgo } from '@/utils/dateUtils';

interface Props {
  invitation: Invitation;
}

const props = defineProps<Props>();

const invitatyionConfig: Record<InvitationStatus, any> = {
  pending: {
    title: 'New invite request',
    message: `${props.invitation.inviter.firstName} has requested your access to the folder "${props.invitation.folder.name}". Join to begin collaborating with them.`
  },
  accepted: {
    title: 'Invitation accepted',
    message: `You have accepted ${props.invitation.inviter.firstName}'s invitation to join "${props.invitation.folder.name}". You can now access and collaborate in this folder.`
  },
  declined: {
    title: 'Invitation declined',
    message: `You declined ${props.invitation.inviter.firstName}'s invitation to join the folder "${props.invitation.folder.name}". You will not receive further notifications for this request.`
  },
  expired: {
    title: 'Invitation expired',
    message: `The invitation from ${props.invitation.inviter.firstName} to join "${props.invitation.folder.name}" has expired. Please ask them to send a new invite if you still need access.`
  }
};

const { mutate: acceptInvitation, isPending: isAcceptingInvitation } = useAcceptInvitation();
const { mutate: declineInvitation, isPending: isDecliningInvitation } = useDeclineInvitation();

function handleAcceptInvitation() {
  acceptInvitation({ token: props.invitation.token });
}

function handleDeclineInvitation() {
  declineInvitation({ token: props.invitation.token });
}
</script>

<template>
  <div
    :class="
      cn('w-full flex gap-3 py-3 px-4 border-b last:border-none border-stroke-1/5', {
        'bg-secondary': props.invitation.status === 'pending',
        'bg-white': props.invitation.status !== 'pending'
      })
    "
  >
    <BaseAvatar
      :src="props.invitation.inviter.avatarUrl"
      :fallback="props.invitation.inviter.firstName"
      class="size-5.5 rounded-full border border-black-20"
    />

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <div class="flex flex-col gap-0.5">
          <p class="text-sm font-medium leading-4 text-black-90">
            {{ invitatyionConfig[props.invitation.status].title }}
          </p>
          <p class="text-[10px] leading-3.5 text-black-70 -tracking-[1%]">
            {{ invitatyionConfig[props.invitation.status].message }}
          </p>
        </div>

        <p class="text-[8px] text-black-50 leading-3.5">
          {{ timeAgo(props.invitation.createdAt) }}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <LoadingButton
          :is-loading="isDecliningInvitation"
          @click="handleDeclineInvitation"
          variant="ghost"
          class="w-full h-7 py-1.5 px-3 text-[10px] font-medium text-black-80 leading-[100%] rounded-full bg-contemporary-background"
        >
          Decline
        </LoadingButton>
        <LoadingButton
          :is-loading="isAcceptingInvitation"
          @click="handleAcceptInvitation"
          variant="outline"
          class="w-full h-7 py-1.5 px-3 text-[10px] font-medium leading-[100%] rounded-full bg-black-100 hover:bg-black-90"
        >
          Accept
        </LoadingButton>
      </div>
    </div>
  </div>
</template>
