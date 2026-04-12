<script setup lang="ts">
import { ref } from 'vue';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockFolders } from '@/mock-data/folders';
import { transformBookmarkFolders } from '@/utils/bookmarkUtils';
import { pluralizeIfArray } from '@/utils/stringutils';

import { FolderThumbnail } from '../../shared/components';
import { ActionDialogWrapper } from '../wrappers';

interface Props {
  bookmarkIds: string[] | string;
}

const props = defineProps<Props>();

const transformedBookmarks = ref(transformBookmarkFolders(mockFolders));
const selectedFolderId = ref<string | null>(null);

const displayBool = defineModel<boolean>({ default: false });

function handleSelectFolder(folderId: string) {
  const isDeselecting = selectedFolderId.value === folderId;

  transformedBookmarks.value = transformedBookmarks.value.map((folder) => ({
    ...folder,
    isSelected: folder.id === folderId ? !isDeselecting : false
  }));

  selectedFolderId.value = isDeselecting ? null : folderId;
}

function handleMove() {
  if (selectedFolderId.value) {
    console.log(
      'Moving bookmarks to folder:',
      selectedFolderId.value,
      'with bookmark ids:',
      props.bookmarkIds
    );
    displayBool.value = false;
  } else {
    console.log('No folder selected');
  }
}
</script>

<template>
  <ActionDialogWrapper
    v-model="displayBool"
    :title="`Move Bookmark${pluralizeIfArray(bookmarkIds)}`"
    :description="`Select the folder you want to move the bookmark${pluralizeIfArray(bookmarkIds)} to.`"
  >
    <div class="flex flex-col gap-0.5 pt-3">
      <Button
        v-for="folder in transformedBookmarks"
        :key="folder.id"
        variant="ghost"
        :class="
          cn('w-full h-fit flex items-center justify-between py-3.5 px-9 rounded-none', {
            'bg-accent': folder.isSelected
          })
        "
        @click="handleSelectFolder(folder.id)"
      >
        <div class="flex gap-3">
          <FolderThumbnail
            :images="[
              'https://picsum.photos/seed/4/800/600',
              'https://picsum.photos/seed/5/800/600',
              'https://picsum.photos/seed/6/1200/600'
            ]"
            :class-names="{
              container: 'size-9 rounded-[6px] py-1 px-0.5',
              images: {
                top: 'rounded-tl-[6px] rounded-tr-[6px] rounded-[4px]',
                bottom: 'w-full h-3.75 rounded-[4px]'
              }
            }"
          />

          <div class="flex flex-col items-start gap-1">
            <p class="text-base font-medium leading-5.5 -tracking-[1%] text-black-80">
              {{ folder.name }}
            </p>
            <p class="text-xs leading-[100%] text-black-50">Updated {{ folder.updated_at }}</p>
          </div>
        </div>

        <p class="text-xs leading-[100%] text-black-80">{{ folder.item_count }} items</p>
      </Button>

      <div class="flex items-center justify-end p-6 border-t border-stroke-1/10">
        <Button
          @click="handleMove"
          :disabled="!selectedFolderId"
          class="w-21.75 h-11 text-base font-medium leading-5.5 text-white -tracking-[1%] pt-2 px-4 rounded-full bg-black-100 hover:bg-black-90"
        >
          Move
        </Button>
      </div>
    </div>
  </ActionDialogWrapper>
</template>
