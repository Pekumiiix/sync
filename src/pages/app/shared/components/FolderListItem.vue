<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ITransformedFolder } from '@/types/folder.type';

import { FolderThumbnail } from '.';

defineProps<{
  folder: ITransformedFolder;
}>();

defineEmits<{
  (e: 'select', id: string): void;
}>();
</script>

<template>
  <Button
    variant="ghost"
    :class="
      cn('w-full h-fit flex items-center justify-between py-3.5 px-9 rounded-none', {
        'bg-accent': folder.isSelected
      })
    "
    @click="$emit('select', folder.id)"
  >
    <div class="flex gap-3">
      <FolderThumbnail
        :images="folder.recentBookmarkImages"
        :class-names="{
          container: 'size-9 rounded-[6px] py-1 px-0.5 gap-1',
          images: {
            top: 'rounded-[4px]',
            bottom: 'h-3 rounded-[4px]'
          }
        }"
      />

      <div class="flex flex-col items-start gap-1">
        <p class="text-base font-medium leading-5.5 -tracking-[1%] text-black-80">
          {{ folder.name }}
        </p>
        <p
          v-if="folder.updatedAt"
          class="text-xs leading-[100%] text-black-50"
        >
          Updated {{ folder.updatedAt }}
        </p>
      </div>
    </div>

    <p class="text-xs leading-[100%] text-black-80">{{ folder.bookmarkCount }} items</p>
  </Button>
</template>
