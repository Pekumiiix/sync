<script setup lang="ts">
import { computed, defineComponent, h, ref } from 'vue';
import { MailOpen } from '@lucide/vue';

import { BasePopover, BaseTabs } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { useGetInvitations } from '@/hooks/useInvitation';

import { QueryStateWrapper } from '../../wrappers';
import { InvitationItem } from '../components';

const activeTab = ref<'pending' | 'resolved'>('pending');

const { data: invitationData, isLoading } = useGetInvitations();

const PendingTabContent = defineComponent({
  setup() {
    return () => {
      const pending = invitationData.value?.data.pendingInvitations || [];

      return h(
        QueryStateWrapper,
        {
          isLoading: isLoading.value,
          isEmpty: !pending.length,
          'loading-title': 'Loading invitations',
          'empty-title': 'No pending invitations found'
        },
        () =>
          pending.map((invitation) =>
            h(InvitationItem, {
              key: invitation.id,
              invitation
            })
          )
      );
    };
  }
});

const ResolvedTabContent = defineComponent({
  setup() {
    return () => {
      const resolved = invitationData.value?.data.resolvedInvitations || [];

      return h(
        QueryStateWrapper,
        {
          isLoading: isLoading.value,
          isEmpty: !resolved.length,
          'loading-title': 'Loading invitations',
          'empty-title': 'No resolved invitations found'
        },
        () =>
          resolved.map((invitation) =>
            h(InvitationItem, {
              key: invitation.id,
              invitation
            })
          )
      );
    };
  }
});

const tabs = computed(() => [
  {
    value: 'pending',
    label: 'Pending',
    element: PendingTabContent
  },
  {
    value: 'resolved',
    label: 'Resolved',
    element: ResolvedTabContent
  }
]);
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
      <div class="size-fit relative">
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
      </div>
    </template>

    <template #default>
      <div class="w-full h-full flex flex-col gap-1.5 p-3.5 pb-0">
        <p class="text-sm font-medium leading-4 text-black-90">Invitations</p>

        <BaseTabs
          v-model="activeTab"
          orientation="horizontal"
          :tabs="tabs"
          :class-names="{
            tab: 'w-full flex flex-col gap-3',
            tabList:
              'w-full flex justify-start gap-6 border-b border-stroke-1/10 rounded-none bg-transparent p-0',
            tabTrigger:
              'flex-none w-fit h-9 py-2 px-1 text-xs border-x-0 border-t-0 border-b-2 border-transparent text-black-80 font-medium leading-[100%] rounded-none bg-transparent shadow-none cursor-pointer hover:text-black-100 data-[state=active]:border-b-primary-100 data-[state=active]:text-black-100 data-[state=active]:bg-transparent data-[state=active]:shadow-none outline-none focus-visible:ring-0',
            content: 'w-full flex flex-col gap-1'
          }"
        />
      </div>
    </template>
  </BasePopover>
</template>
