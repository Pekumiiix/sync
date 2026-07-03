<script setup lang="ts">
import { ref } from 'vue';

import { EditIcon, EyeIcon, PinIcon, TrashIcon, UnpinIcon } from '@/components/icons';
import { LoadingButton } from '@/components/shared';
import { Checkbox } from '@/components/ui/checkbox';
import { usePinBookmark, useUnpinBookmark } from '@/hooks/useBookmark';
import type { IBookmark } from '@/types/bookmark.type';
import { FALLBACK_IMAGE, handleImageError } from '@/utils/bookmarkUtils';
import { formatBookmarkTime } from '@/utils/dateUtils';

import { BookmarkDetailsDialog, DeleteBookmarkDialog } from '../dialogs';
import type { BookmarkDetails } from '../schemas/bookmark-details.schema';

interface Props {
  bookmark: IBookmark;
  showCheckbox?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showCheckbox: true
});

const selectedBool = defineModel<boolean>({ default: false });

const detailsDisplayBool = ref<boolean>(false);
const deleteDisplayOpen = ref<boolean>(false);

const { mutate: pinBookmark, isPending: isPinning } = usePinBookmark();
const { mutate: unpinBookmark, isPending: isUnpinning } = useUnpinBookmark();

const actions = [
  {
    icon: EyeIcon,
    label: 'View',
    action: () => {
      console.log('Viewed this bookmark.');
    }
  },
  props.bookmark.isPinned
    ? {
        icon: UnpinIcon,
        label: 'Unpin',
        isLoading: isUnpinning,
        action: () =>
          unpinBookmark({
            bookmarkId: props.bookmark.id
          })
      }
    : {
        icon: PinIcon,
        label: 'Pin',
        isLoading: isPinning,
        action: () =>
          pinBookmark({
            bookmarkId: props.bookmark.id
          })
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
        v-if="props.showCheckbox"
        v-model:model-value="selectedBool"
        class="size-4"
      />

      <div class="flex items-center gap-2.5">
        <img
          :src="props.bookmark.faviconUrl || FALLBACK_IMAGE"
          :alt="props.bookmark.domain"
          class="size-12 rounded-full object-center object-cover"
          @error="handleImageError"
        />

        <div class="flex flex-col gap-1">
          <p class="text-lg font-medium leading-[100%] text-black-90">{{ props.bookmark.title }}</p>
          <p class="text-sm leading-4.5 text-black-70">
            {{ props.bookmark.domain }} | {{ props.bookmark.folder.name }} |
            {{ formatBookmarkTime(props.bookmark.createdAt) }}
          </p>
          <div class="flex items-center gap-1">
            <template
              v-for="(tag, index) in props.bookmark.tags"
              :key="tag"
            >
              <p class="text-xs leading-[100%] text-primary-90">#{{ tag }}</p>

              <div
                v-if="index < props.bookmark.tags.length - 1"
                class="w-px h-2 bg-primary-90 shrink-0"
              />
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden group-hover:flex items-center gap-5">
      <LoadingButton
        v-for="action in actions"
        :key="action.label"
        size="icon"
        variant="ghost"
        class="size-fit! p-1! stroke-black-70"
        :is-loading="action.isLoading?.value || false"
        @click="action.action"
      >
        <component
          :is="action.icon"
          class="size-4"
        />
      </LoadingButton>
    </div>
  </div>

  <BookmarkDetailsDialog
    v-model="detailsDisplayBool"
    :data="{
      image: props.bookmark.faviconUrl || '',
      title: props.bookmark.title,
      description: props.bookmark.description || '',
      url: props.bookmark.url,
      tags: props.bookmark.tags,
      folder_name: props.bookmark.folder.name
    }"
    @save="handleEditBookmark"
    type="edit"
  />

  <DeleteBookmarkDialog
    :bookmark-ids="props.bookmark.id"
    v-model="deleteDisplayOpen"
  />
</template>
