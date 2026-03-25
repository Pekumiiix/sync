<script setup lang="ts">
import { computed, ref } from 'vue';
import { Ellipsis } from 'lucide-vue-next';

import {
  EditIcon,
  FolderIcon,
  PinIcon,
  SelectIcon,
  TrashIcon,
  UnpinIcon
} from '@/components/icons';
import { BaseDropDownMenu } from '@/components/re-useable';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { IBookmarkCard } from '@/types/app.type';

import { BookmarkDetailsDialog } from '../../shared/add-bookmark-dialog/dialogs';
import type { BookmarkDetails } from '../../shared/add-bookmark-dialog/schemas/bookmark-details.schema';
import { DeleteBookmarkDialog } from '.';

interface Props {
  bookmark: IBookmarkCard;
  showCheckbox: boolean;
}

const props = defineProps<Props>();

const { platform, link, collection, time, image, isPinned, tags, description } = props.bookmark;

const detailsDisplayBool = ref<boolean>(false);

const selectBool = defineModel<boolean>({ default: false });
const deleteDisplayBool = ref<boolean>(false);

const actions = computed(() => [
  isPinned
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
    icon: SelectIcon,
    label: selectBool.value ? 'Deselect' : 'Select',
    action: () => {
      selectBool.value = !selectBool.value;
    }
  },
  {
    icon: FolderIcon,
    label: 'Move',
    action: () => console.log('Moved')
  },
  {
    icon: TrashIcon,
    label: 'Delete',
    action: () => {
      deleteDisplayBool.value = true;
    }
  }
]);

function handleEditBookmark(data: BookmarkDetails) {
  console.log('Edit bookmark:', data);
}
</script>

<template>
  <div class="min-w-68.5 w-[32%] 2xl:w-[22%] flex flex-col rounded-xl border border-white-90">
    <img
      :src="image"
      :alt="platform"
      class="w-full max-h-39.75 h-auto rounded-t-xl"
    />

    <div class="w-full flex justify-between gap-5 py-5 px-3">
      <div class="flex flex-col gap-1">
        <p class="text-lg font-medium leading-[100%] text-black-90">{{ platform }}</p>
        <p class="text-sm leading-4.5 text-black-90">{{ link }} | {{ collection }}</p>
        <p class="text-sm leading-4.5 text-black-50">{{ time }}</p>
      </div>

      <Checkbox
        v-if="showCheckbox"
        v-model:model-value="selectBool"
      />

      <BaseDropDownMenu
        v-else
        :items="actions"
        :class-names="{
          trigger: 'p-0.5 rounded-md hover:bg-[#E8E8E8]/50',
          content: 'w-32 flex flex-col gap-0.5 p-0 rounded-xl',
          item: (label) =>
            cn(
              'h-8 flex items-center justify-start gap-1.5 focus-visible:ring-0 rounded-none first:rounded-t-xl last:rounded-b-xl',
              { 'hover:bg-[#FF2F00]/5!': label === 'Delete' }
            ),
          icon: (label) =>
            cn('size-3.5 transition-colors duration-200', {
              'stroke-[#FF2F00]': label === 'Delete',
              'stroke-black-90': label !== 'Delete',
              'fill-black-90': label === 'Deselect'
            }),
          label: (label) =>
            cn('text-xs leading-[100%] font-normal', {
              'text-[#FF2F00]': label === 'Delete',
              'text-black-90': label !== 'Delete'
            })
        }"
      >
        <Ellipsis
          :size="24"
          color="var(--color-black-50)"
          class="shrink-0"
        />
      </BaseDropDownMenu>
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

  <DeleteBookmarkDialog v-model="deleteDisplayBool" />
</template>
