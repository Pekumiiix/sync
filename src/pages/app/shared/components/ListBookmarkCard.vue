<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { EditIcon, EyeIcon, FolderIcon, PinIcon, TrashIcon, UnpinIcon } from '@/components/icons';
import { LoadingButton } from '@/components/shared';
import { Checkbox } from '@/components/ui/checkbox';
import { usePinBookmark, useUnpinBookmark } from '@/hooks/useBookmark';
import type { IBookmark } from '@/types/bookmark.type';
import { FALLBACK_IMAGE, handleBookmarkView, handleImageError } from '@/utils/bookmarkUtils';
import { timeAgo } from '@/utils/dateUtils';

import { DeleteBookmarkDialog, EditBookmarkDialog, MoveBookmarkDialog } from '../dialogs';

interface Props {
  bookmark: IBookmark;
  showCheckbox?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showCheckbox: true
});

const route = useRoute();

const selectedBool = defineModel<boolean>({ default: false });

const detailsDisplayBool = ref<boolean>(false);
const deleteDisplayOpen = ref<boolean>(false);
const moveBookmarkDisplayBool = ref<boolean>(false);

const { mutate: pinBookmark, isPending: isPinning } = usePinBookmark();
const { mutate: unpinBookmark, isPending: isUnpinning } = useUnpinBookmark();

const actions = [
  {
    icon: EyeIcon,
    label: 'View',
    action: () => handleBookmarkView(props.bookmark.url)
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
      deleteDisplayOpen.value = true;
    }
  }
];
</script>

<template>
  <div
    class="flex items-center justify-between py-8 px-6.5 border-b border-stroke-1/10 group hover:bg-[#F8F8F9] transition-colors duration-200 cursor-pointer"
  >
    <div class="w-fit flex items-center gap-4">
      <Checkbox
        v-if="props.showCheckbox && route.name !== 'All Bookmarks'"
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
            {{ props.bookmark.domain }} |
            <router-link
              :to="{ name: 'Bookmark Folder', params: { folderId: props.bookmark.folder.id } }"
              class="hover:text-primary-90 transition-colors duration-200"
            >
              {{ props.bookmark.folder.name.toLocaleLowerCase() }}
            </router-link>
            |
            {{ timeAgo(props.bookmark.createdAt) }}
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

  <EditBookmarkDialog
    v-model="detailsDisplayBool"
    :data="{
      id: props.bookmark.id,
      favIconUrl: props.bookmark.faviconUrl || FALLBACK_IMAGE,
      title: props.bookmark.title,
      description: props.bookmark.description || '',
      tags: props.bookmark.tags
    }"
  />

  <DeleteBookmarkDialog
    :bookmark-ids="props.bookmark.id"
    v-model="deleteDisplayOpen"
  />

  <MoveBookmarkDialog
    :bookmarkIds="props.bookmark.id"
    v-model="moveBookmarkDisplayBool"
  />
</template>
