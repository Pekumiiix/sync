<script setup lang="ts">
import { MailOpen } from '@lucide/vue';

import { BasePopover } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { useGetInvitations } from '@/hooks/useInvitation';

import { QueryStateWrapper } from '../../wrappers';
import { InvitationItem } from '../components';

const { data: invitationData, isLoading } = useGetInvitations();
</script>

<template>
  <BasePopover
    :class-names="{
      content:
        'w-81 max-h-121 h-[80vh] flex flex-col py-2 px-0 rounded-2xl overflow-hidden overflow-y-scroll scrollbar-none',
      trigger: 'size-fit relative'
    }"
  >
    <template #trigger>
      <Button
        variant="outline"
        class="size-10 rounded-full p-2.75 bg-[#F9F9FA] border-stroke-1/10"
      >
        <MailOpen class="size-4.5 text-black-100 stroke-[1.5]" />
      </Button>

      <span
        v-if="invitationData?.data.pendingInvitations.length"
        class="absolute size-3 rounded-full bg-[#D54524] -top-0.5 right-0"
      />
    </template>

    <template #default>
      <div class="flex items-center justify-between p-3.5 border-b border-stroke-1/10">
        <p class="text-sm font-medium leading-4 text-black-90">Invitations</p>
      </div>

      <QueryStateWrapper
        :is-loading="isLoading"
        :is-empty="!invitationData?.data.pendingInvitations.length"
        loading-title="Loading invitations"
        empty-title="No invitations found"
      >
        <InvitationItem
          v-for="invitation in invitationData?.data.pendingInvitations"
          :key="invitation.id"
          :invitation="invitation"
        />

        <InvitationItem
          v-for="invitation in invitationData?.data.resolvedInvitations"
          :key="invitation.id"
          :invitation="invitation"
        />
      </QueryStateWrapper>
    </template>
  </BasePopover>
</template>
