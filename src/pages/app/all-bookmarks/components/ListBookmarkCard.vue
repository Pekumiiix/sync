<script setup lang="ts">
import { EditIcon, PinIcon, TrashIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { IBookmarkCard as Props } from '@/types/app.type';

defineProps<Props>();
</script>

<template>
  <div class="flex items-center justify-between py-8 px-6.5 border-b border-stroke-1/10 group">
    <div class="w-fit flex items-center gap-4">
      <Checkbox class="size-4" />

      <div class="flex items-center gap-2.5">
        <img
          :src="image"
          :alt="platform"
          class="size-12 rounded-full"
        />

        <div class="flex flex-col gap-1">
          <p class="text-lg font-medium leading-[100%] text-black-90">{{ platform }}</p>
          <p class="text-sm leading-4.5 text-black-90">{{ link }} | {{ category }}</p>
          <p class="text-sm leading-4.5 text-black-50">{{ time }}</p>
        </div>
      </div>
    </div>

    <div class="hidden group-hover:flex items-center gap-5">
      <Button
        size="icon"
        variant="ghost"
        class="size-fit! p-1!"
      >
        <PinIcon class="size-6" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        class="size-fit! p-1!"
      >
        <EditIcon class="size-6" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        class="size-fit! p-1!"
      >
        <TrashIcon class="size-6 stroke-black-70" />
      </Button>
    </div>
  </div>
</template>
