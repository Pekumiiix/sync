<script setup lang="ts">
import { Ellipsis } from 'lucide-vue-next';

import { EditIcon, FolderIcon, SelectIcon, TrashIcon, UnpinIcon } from '@/components/icons';
import { BasePopover } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { IBookmarkCard as Props } from '@/types/app.type';

defineProps<Props>();

const actions = [
  {
    icon: UnpinIcon,
    label: 'Unpin',
    action: () => console.log('Unpinned')
  },
  {
    icon: EditIcon,
    label: 'Edit',
    action: () => console.log('Edited')
  },
  {
    icon: SelectIcon,
    label: 'Select',
    action: () => console.log('Selected')
  },
  {
    icon: FolderIcon,
    label: 'Move',
    action: () => console.log('Moved')
  },
  {
    icon: TrashIcon,
    label: 'Delete',
    action: () => console.log('Deleted')
  }
];
</script>

<template>
  <div class="max-w-67.5 w-full flex flex-col rounded-xl border border-white-90">
    <img
      :src="image"
      :alt="platform"
      class="w-full max-h-39.75 h-auto rounded-t-xl"
    />

    <div class="w-full flex justify-between gap-5 py-5 px-3">
      <div class="flex flex-col gap-1">
        <p class="text-lg font-medium leading-[100%] text-black-90">{{ platform }}</p>
        <p class="text-sm leading-4.5 text-black-90">{{ link }} | {{ category }}</p>
        <p class="text-sm leading-4.5 text-black-50">{{ time }}</p>
      </div>

      <BasePopover :class-names="{ content: 'w-32 flex flex-col gap-0.5 p-0 rounded-xl' }">
        <template #trigger>
          <Ellipsis
            :size="24"
            color="var(--color-black-50)"
          />
        </template>

        <template #default>
          <Button
            v-for="item in actions"
            :key="item.label"
            variant="ghost"
            :class="
              cn(
                'flex items-center justify-start gap-1.5 focus-visible:ring-0 rounded-none first:rounded-t-xl last:rounded-b-xl',
                { 'hover:bg-[#FF2F00]/5': item.label === 'Delete' }
              )
            "
            @click="item.action"
          >
            <component
              :is="item.icon"
              :class="
                cn('size-3.5', {
                  'stroke-[#FF2F00]': item.label === 'Delete',
                  'stroke-black-90': item.label !== 'Delete'
                })
              "
            />
            <span
              :class="
                cn('text-xs leading-[100%] font-normal', {
                  'text-[#FF2F00]': item.label === 'Delete',
                  'text-black-90': item.label !== 'Delete'
                })
              "
              >{{ item.label }}</span
            >
          </Button>
        </template>
      </BasePopover>
    </div>
  </div>
</template>
