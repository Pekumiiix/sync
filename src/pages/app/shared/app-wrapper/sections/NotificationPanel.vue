<script setup lang="ts">
import { NotificationIcon } from '@/components/icons';
import { BasePopover } from '@/components/re-useable';
import { LoadingButton } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { useMarkAllAsRead } from '@/hooks/useNotification';
import type { INotification } from '@/types/notification.type';

import { NotificationItem } from '../components';

interface Props {
  notifications: INotification[];
  isLoading?: boolean;
  unreadCount: number;
}

defineProps<Props>();

const { mutate, isPending } = useMarkAllAsRead();
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
        :disabled:="isLoading"
        variant="outline"
        class="size-10 rounded-full p-2.75 bg-[#F9F9FA] border-stroke-1/10"
      >
        <NotificationIcon class="size-4.5" />
      </Button>
    </template>

    <template #default>
      <div class="flex items-center justify-between p-3.5 border-b border-stroke-1/10">
        <p class="text-sm font-medium leading-4 text-black-90">Notifications</p>

        <LoadingButton
          :isLoading="isPending"
          :disabled="unreadCount >= 0"
          @click="() => mutate()"
          variant="ghost"
          class="text-xs font-medium leading-[100%] text-primary-100 hover:text-primary-100 hover:bg-primary-10"
          loader-class="size-5"
        >
          <span>Mark all as read</span>
        </LoadingButton>
      </div>

      <NotificationItem
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </template>
  </BasePopover>
</template>
