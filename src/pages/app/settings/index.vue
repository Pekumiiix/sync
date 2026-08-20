<script setup lang="ts">
import { computed } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';

import { BaseTabs } from '@/components/re-useable';

import { AppWrapper } from '../shared';
import {
  AccountInformationTab,
  BookmarkManagementTab,
  HelpAndSupportTab,
  LinkedAccountsTab,
  NotificationsTab,
  SubscriptionTab,
  SyncSettingsTab
} from './sections';

const params = useUrlSearchParams('history');

const activeTab = computed({
  get: () => (params.tab as string) || 'account',
  set: (newValue) => {
    params.tab = newValue;
  }
});

const tabs = [
  {
    value: 'account',
    label: 'Account Information',
    element: AccountInformationTab
  },
  {
    value: 'sync_settings',
    label: 'Sync Settings',
    element: SyncSettingsTab
  },
  {
    value: 'subscription',
    label: 'Subscription',
    element: SubscriptionTab
  },
  {
    value: 'bookmark_management',
    label: 'Bookmark Management',
    element: BookmarkManagementTab
  },
  {
    value: 'linked_accounts',
    label: 'Linked Accounts',
    element: LinkedAccountsTab
  },
  {
    value: 'notifications',
    label: 'Notifications',
    element: NotificationsTab
  },
  {
    value: 'help_and_support',
    label: 'Help & Support',
    element: HelpAndSupportTab
  }
];
</script>

<template>
  <AppWrapper page="Settings">
    <div class="size-full mt-4">
      <BaseTabs
        v-model="activeTab"
        orientation="horizontal"
        :tabs="tabs"
        :class-names="{
          tab: 'size-full flex flex-row pt-10',
          tabList:
            'h-full flex flex-col justify-start gap-2 pt-0 px-6.5 rounded-none bg-transparent',
          tabTrigger:
            'w-51 max-h-9.5! justify-start py-2.5 px-6 rounded-full text-sm font-normal leading-4.5 text-black-70 data-[state=active]:font-medium data-[state=active]:text-black-90 data-[state=active]:bg-contemporary-background data-[state=active]:shadow-none cursor-pointer',
          content: 'size-full px-8.75'
        }"
      />
    </div>
  </AppWrapper>
</template>
