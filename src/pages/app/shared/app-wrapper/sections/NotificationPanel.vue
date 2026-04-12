<script setup lang="ts">
import { NotificationIcon } from '@/components/icons';
import { BasePopover } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { mockNotifications } from '@/mock-data/notifications';
import { formatNotificationForUI } from '@/utils/notificationsUtils';

import { NotificationItem } from '../components';

const transformedNotifications = mockNotifications.map((notification) =>
  formatNotificationForUI(notification)
);
</script>

<template>
  <BasePopover
    :class-names="{
      content:
        'w-81 h-[80vh] max-h-121 flex flex-col py-2 px-0 rounded-2xl overflow-hidden overflow-y-scroll scrollbar-none'
    }"
  >
    <template #trigger>
      <Button
        variant="outline"
        class="size-10 rounded-full p-2.75 bg-[#F9F9FA] border-stroke-1/10"
      >
        <NotificationIcon class="size-4.5" />
      </Button>
    </template>

    <template #default>
      <div class="flex items-center justify-between p-3.5 border-b border-stroke-1/10">
        <p class="text-sm font-medium leading-4 text-black-90">Notifications</p>

        <Button
          variant="ghost"
          class="text-xs font-medium leading-[100%] text-primary-100 hover:text-primary-100 hover:bg-primary-10"
        >
          Mark all as read
        </Button>
      </div>

      <NotificationItem
        v-for="notification in transformedNotifications"
        :key="notification.id"
        :notification="notification"
      />
    </template>
  </BasePopover>
</template>
