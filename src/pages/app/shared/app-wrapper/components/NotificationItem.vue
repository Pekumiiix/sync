<script setup lang="ts">
import { computed } from 'vue';
import { CheckCheck, MailIcon } from 'lucide-vue-next';

import { TrashIcon } from '@/components/icons';
import { BaseAvatar } from '@/components/re-useable';
import { LoadingButton } from '@/components/shared';
import { useDeleteNotification, useMarkAsRead, useMarkAsUnread } from '@/hooks/useNotification';
import { cn } from '@/lib/utils';
import type { INotification } from '@/types/notification.type';
import { timeAgo } from '@/utils/dateUtils';
import { computeUserName } from '@/utils/stringutils';

interface Props {
  notification: INotification;
}

const props = defineProps<Props>();

const avatarFallback = computed(() =>
  computeUserName(props.notification.actor.firstName, props.notification.actor.lastName)
);

const { mutate: deleteNotification, isPending: isDeleting } = useDeleteNotification();
const { mutate: markAsRead, isPending: isMarkingRead } = useMarkAsRead();
const { mutate: markAsUnread, isPending: isMarkingUnread } = useMarkAsUnread();

const actionButtons = computed(() => [
  props.notification.isRead
    ? {
        name: 'Mark as unread',
        action: () => markAsUnread({ notificationId: props.notification.id }),
        isLoading: isMarkingUnread,
        disabled: !props.notification.isRead,
        icon: MailIcon,
        class:
          'size-7 p-0 rounded-full text-primary-100 hover:text-primary-100 hover:bg-primary-10',
        loaderClass: 'size-3.5'
      }
    : {
        name: 'Mark as read',
        action: () => markAsRead({ notificationId: props.notification.id }),
        isLoading: isMarkingRead,
        disabled: props.notification.isRead,
        icon: CheckCheck,
        class:
          'size-7 p-0 rounded-full text-primary-100 hover:text-primary-100 hover:bg-primary-10',
        loaderClass: 'size-3.5'
      },
  {
    name: 'Delete notification',
    action: () => deleteNotification({ notificationId: props.notification.id }),
    isLoading: isDeleting,
    disabled: false,
    icon: TrashIcon,
    class: 'size-7 p-0 rounded-full stroke-red-500 hover:stroke-red-600 hover:bg-red-50',
    loaderClass: 'size-3.5'
  }
]);
</script>

<template>
  <div
    :class="
      cn(
        'group w-full flex items-start gap-3 py-3 px-4 border-b last:border-none border-stroke-1/5 transition-colors duration-200 relative',
        {
          'bg-secondary hover:bg-secondary/80': !props.notification.isRead,
          'bg-white hover:bg-black-5/5': props.notification.isRead
        }
      )
    "
  >
    <BaseAvatar
      :src="props.notification.actor.avatar"
      :fallback="avatarFallback"
      class="size-5.5 rounded-full border border-black-20 shrink-0 [&>span]:text-[10px]"
    />

    <div class="flex-1 flex flex-col gap-1.5 min-w-0">
      <div class="flex flex-col gap-0.5">
        <p class="text-sm font-medium leading-4 text-black-90 truncate">
          {{ props.notification.title }}
        </p>
        <p class="text-[10px] leading-3.5 text-black-70 tracking-[-1%]">
          {{ props.notification.message }}
        </p>
      </div>

      <p class="text-[8px] text-black-50 leading-3.5">
        {{ timeAgo(props.notification.createdAt) }}
      </p>
    </div>

    <div
      class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
      :class="{ 'opacity-100': isDeleting || isMarkingRead || isMarkingUnread }"
    >
      <LoadingButton
        v-for="button in actionButtons"
        :key="button.name"
        :isLoading="button.isLoading.value"
        @click="button.action"
        variant="ghost"
        :title="button.name"
        :class="button.class"
        :loader-class="button.loaderClass"
      >
        <component
          :is="button.icon"
          class="size-3.5"
        />
      </LoadingButton>
    </div>
  </div>
</template>
