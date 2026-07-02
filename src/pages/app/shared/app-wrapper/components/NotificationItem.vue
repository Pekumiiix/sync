<script setup lang="ts">
import { BaseAvatar } from '@/components/re-useable';
import { cn } from '@/lib/utils';
import type { INotification } from '@/types/notification.type';
import { timeAgo } from '@/utils/dateUtils';

interface Props {
  notification: INotification;
}

const props = defineProps<Props>();

const { title, message, createdAt, actor, isRead } = props.notification;
</script>

<template>
  <div
    :class="
      cn('w-full flex gap-3 py-3 px-4 border-b last:border-none border-stroke-1/5', {
        'bg-secondary': !isRead,
        'bg-white': isRead
      })
    "
  >
    <BaseAvatar
      :src="actor.avatarUrl"
      :fallback="actor.name"
      class="size-5.5 rounded-full border border-black-20"
    />

    <div class="flex flex-col gap-1.5">
      <div class="flex flex-col gap-0.5">
        <p class="text-sm font-medium leading-4 text-black-90">{{ title }}</p>
        <p class="text-[10px] leading-3.5 text-black-70 -tracking-[1%]">
          {{ message }}
        </p>
      </div>

      <p class="text-[8px] text-black-50 leading-3.5">{{ timeAgo(createdAt) }}</p>
    </div>
  </div>
</template>
