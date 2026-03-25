<script setup lang="ts">
import { ref } from 'vue';

import { EditIcon, PinIcon, TrashIcon, UnpinIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { IBookmarkCard as Props } from '@/types/app.type';

import { BookmarkDetailsDialog } from '../../shared/add-bookmark-dialog/dialogs';
import type { BookmarkDetails } from '../../shared/add-bookmark-dialog/schemas/bookmark-details.schema';
import { DeleteBookmarkDialog } from '.';

const props = defineProps<Props>();

const selectedBool = defineModel<boolean>({ default: false });

const detailsDisplayBool = ref<boolean>(false);
const deleteDisplayOpen = ref<boolean>(false);

const actions = [
  props.isPinned
    ? {
        icon: UnpinIcon,
        label: 'Unpin',
        action: () => console.log('Unpinned')
      }
    : {
        icon: PinIcon,
        label: 'Pin',
        action: () => console.log('Pinned')
      },
  {
    icon: EditIcon,
    label: 'Edit',
    action: () => {
      detailsDisplayBool.value = true;
    }
  },
  {
    icon: TrashIcon,
    label: 'Delete',
    action: () => {
      deleteDisplayOpen.value = true;
    }
  }
];

function handleEditBookmark(data: BookmarkDetails) {
  console.log('Edit bookmark:', data);
}
</script>

<template>
  <div
    class="flex items-center justify-between py-8 px-6.5 border-b border-stroke-1/10 group hover:bg-[#F8F8F9] transition-colors duration-200 cursor-pointer"
  >
    <div class="w-fit flex items-center gap-4">
      <Checkbox
        v-model:model-value="selectedBool"
        class="size-4"
      />

      <div class="flex items-center gap-2.5">
        <img
          :src="image"
          :alt="platform"
          class="size-12 rounded-full"
        />

        <div class="flex flex-col gap-1">
          <p class="text-lg font-medium leading-[100%] text-black-90">{{ platform }}</p>
          <p class="text-sm leading-4.5 text-black-70">
            {{ link }} | {{ collection }} | {{ time }}
          </p>
          <div class="flex items-center gap-1">
            <template
              v-for="(tag, index) in tags"
              :key="tag"
            >
              <p class="text-xs leading-[100%] text-primary-90">#{{ tag }}</p>

              <div
                v-if="index < tags.length - 1"
                class="w-px h-2 bg-primary-90 shrink-0"
              />
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden group-hover:flex items-center gap-5">
      <Button
        v-for="action in actions"
        :key="action.label"
        size="icon"
        variant="ghost"
        class="size-fit! p-1! stroke-black-70"
        @click="action.action"
      >
        <component
          :is="action.icon"
          class="size-4"
        />
      </Button>
    </div>
  </div>

  <BookmarkDetailsDialog
    v-model="detailsDisplayBool"
    :data="{
      image,
      title: platform,
      description,
      url: link,
      tags,
      collection
    }"
    @save="handleEditBookmark"
    type="edit"
  />

  <DeleteBookmarkDialog v-model="deleteDisplayOpen" />
</template>
