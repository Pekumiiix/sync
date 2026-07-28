<script setup lang="ts">
import { computed } from 'vue';

import { BaseAvatar } from '@/components/re-useable';
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
</script>

<template>
  <div
    :class="
      cn(
        'w-full flex gap-3 py-3 px-4 border-b last:border-none border-stroke-1/5 [&>span]:text-xs',
        {
          'bg-secondary': !props.notification.isRead,
          'bg-white': props.notification.isRead
        }
      )
    "
  >
    <BaseAvatar
      :src="props.notification.actor.avatar"
      :fallback="avatarFallback"
      class="size-5.5 rounded-full border border-black-20 [&>span]:text-[10px]"
    />

    <div class="flex flex-col gap-1.5">
      <div class="flex flex-col gap-0.5">
        <p class="text-sm font-medium leading-4 text-black-90">{{ props.notification.title }}</p>
        <p class="text-[10px] leading-3.5 text-black-70 tracking-[-1%]">
          {{ props.notification.message }}
        </p>
      </div>

      <p class="text-[8px] text-black-50 leading-3.5">
        {{ timeAgo(props.notification.createdAt) }}
      </p>
    </div>
  </div>
</template>
