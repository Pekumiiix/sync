<script setup lang="ts">
import { computed } from 'vue';
import { CheckCheck } from 'lucide-vue-next';

import { NotificationIcon, TrashIcon } from '@/components/icons';
import { BasePopover } from '@/components/re-useable';
import { LoadingButton } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
  useDeleteAllNotifications,
  useGetAllNotifications,
  useMarkAllAsRead
} from '@/hooks/useNotification';

import { QueryStateWrapper } from '../../wrappers';
import { NotificationItem } from '../components';

const params = computed(() => ({
  page: 1,
  limit: 10
}));

const { mutate: markAllRead, isPending: isMarkingRead } = useMarkAllAsRead();
const { mutate: deleteAll, isPending: isDeletingAll } = useDeleteAllNotifications();
const { data: notificationData, isLoading } = useGetAllNotifications(params);

const actionButtons = computed(() => [
  {
    name: 'Mark all as read',
    action: () => markAllRead(),
    isLoading: isMarkingRead,
    disabled: (notificationData.value?.data.meta.unreadCount || 0) === 0,
    icon: CheckCheck,
    class:
      'text-xs font-medium leading-[100%] text-primary-100 hover:text-primary-100 hover:bg-primary-10 px-2 rounded-full',
    loaderClass: 'size-5 text-primary-100'
  },
  {
    name: 'Clear all',
    action: () => deleteAll(),
    isLoading: isDeletingAll,
    disabled: !notificationData.value?.data.notifications.length,
    icon: TrashIcon,
    class:
      'flex items-center justify-center text-xs font-medium leading-[100%] stroke-red-500 hover:stroke-red-600 hover:bg-red-50 px-2 rounded-full',
    loaderClass: 'size-5 text-red-500'
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
          <NotificationIcon class="size-4.5 pointer-events-none" />
        </Button>

        <span
          v-if="(notificationData?.data.meta.unreadCount || 0) > 0"
          class="absolute size-3 rounded-full bg-[#D54524] -top-0.5 right-0"
        />
      </div>
    </template>

    <template #default>
      <div class="flex items-center justify-between p-3.5 border-b border-stroke-1/10">
        <p class="text-sm font-medium leading-4 text-black-90">Notifications</p>

        <div class="flex items-center gap-1">
          <LoadingButton
            v-for="button in actionButtons"
            :key="button.name"
            :isLoading="button.isLoading.value"
            :disabled="button.disabled"
            @click="button.action"
            :class="button.class"
            :loader-class="button.loaderClass"
            :title="button.name"
            variant="ghost"
          >
            <component
              :is="button.icon"
              class="size-4.5"
            />
          </LoadingButton>
        </div>
      </div>

      <QueryStateWrapper
        :is-loading="isLoading"
        :is-empty="!notificationData?.data.notifications.length"
        empty-title="No notifications found"
      >
        <NotificationItem
          v-for="notification in notificationData?.data.notifications"
          :key="notification.id"
          :notification="notification"
        />
      </QueryStateWrapper>
    </template>
  </BasePopover>
</template>
