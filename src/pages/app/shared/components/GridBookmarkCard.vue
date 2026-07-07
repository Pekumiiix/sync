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
import { usePinBookmark, useUnpinBookmark } from '@/hooks/useBookmark';
import { cn } from '@/lib/utils';
import type { IBookmark } from '@/types/bookmark.type';
import { FALLBACK_IMAGE, handleImageError } from '@/utils/bookmarkUtils';
import { formatBookmarkTime } from '@/utils/dateUtils';

import { DeleteBookmarkDialog, EditBookmarkDialog, MoveBookmarkDialog } from '../dialogs';

interface Props {
  bookmark: IBookmark;
  showCheckbox: boolean;
}

const props = defineProps<Props>();

const detailsDisplayBool = ref<boolean>(false);
const moveBookmarkDisplayBool = ref<boolean>(false);

const selectBool = defineModel<boolean>({ default: false });
const deleteDisplayBool = ref<boolean>(false);

const { mutate: pinBookmark } = usePinBookmark();
const { mutate: unpinBookmark } = useUnpinBookmark();

const actions = computed(() => [
  props.bookmark.isPinned
    ? {
        icon: UnpinIcon,
        label: 'Unpin',
        action: () => unpinBookmark({ bookmarkId: props.bookmark.id })
      }
    : {
        icon: PinIcon,
        label: 'Pin',
        action: () => pinBookmark({ bookmarkId: props.bookmark.id })
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
    action: () => {
      moveBookmarkDisplayBool.value = true;
    }
  },
  {
    icon: TrashIcon,
    label: 'Delete',
    action: () => {
      deleteDisplayBool.value = true;
    }
  }
]);
</script>

<template>
  <div class="min-w-68.5 w-[32%] 2xl:w-[22%] flex flex-col rounded-xl border border-white-90">
    <div class="w-full h-39.75 overflow-hidden rounded-t-xl">
      <img
        :src="props.bookmark.coverImageUrl || FALLBACK_IMAGE"
        :alt="props.bookmark.domain"
        class="w-full max-h-39.75 h-auto rounded-t-xl object-cover"
        @error="handleImageError"
      />
    </div>

    <div class="w-full flex justify-between gap-5 py-5 px-3">
      <div class="max-w-[80%] flex flex-col gap-1">
        <p class="text-lg font-medium leading-[100%] text-black-90">
          {{ props.bookmark.websiteName }}
        </p>
        <p class="text-sm leading-4.5 text-black-90">
          {{ props.bookmark.domain }} |
          <router-link
            :to="{ name: 'Bookmark Folder', params: { folderId: props.bookmark.folder.id } }"
            class="hover:text-primary-90 transition-colors duration-200"
          >
            {{ props.bookmark.folder.name.toLocaleLowerCase() }}
          </router-link>
        </p>
        <p class="text-sm leading-4.5 text-black-50">
          {{ formatBookmarkTime(props.bookmark.createdAt) }}
        </p>
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

  <EditBookmarkDialog
    v-model="detailsDisplayBool"
    :data="{
      id: props.bookmark.id,
      favIconUrl: props.bookmark.faviconUrl || '',
      title: props.bookmark.title,
      description: props.bookmark.description || '',
      tags: props.bookmark.tags
    }"
  />

  <DeleteBookmarkDialog
    :bookmarkIds="props.bookmark.id"
    v-model="deleteDisplayBool"
  />

  <MoveBookmarkDialog
    :bookmarkIds="props.bookmark.id"
    v-model="moveBookmarkDisplayBool"
  />
</template>
