<script setup lang="ts">
import { ref } from 'vue';

import { LoadingButton } from '@/components/shared';
import { mockFoldersResponse } from '@/mock-data/folders';
import type { ITransformedFolder } from '@/types/folder.type';
import { transformBookmarkFolders } from '@/utils/bookmarkUtils';
import { pluralizeIfArray } from '@/utils/stringutils';

import { FolderListItem } from '../components';
import { ActionDialogWrapper } from '../wrappers';

interface Props {
  bookmarkIds: string[] | string;
}

const props = defineProps<Props>();

const transformedBookmarks = ref(transformBookmarkFolders(mockFoldersResponse));
const selectedFolderId = ref<string | null>(null);

const displayBool = defineModel<boolean>({ default: false });

function handleSelectFolder(folderId: string) {
  const isDeselecting = selectedFolderId.value === folderId;

  const updateSelection = (folders: ITransformedFolder[]) =>
    folders.map((folder) => ({
      ...folder,
      isSelected: folder.id === folderId ? !isDeselecting : false
    }));

  transformedBookmarks.value = {
    systemFolders: updateSelection(transformedBookmarks.value.systemFolders),
    collections: updateSelection(transformedBookmarks.value.collections)
  };

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
      <FolderListItem
        v-for="folder in transformedBookmarks?.systemFolders || []"
        :key="folder.id"
        :folder="folder"
        @select="handleSelectFolder"
      />

      <FolderListItem
        v-for="folder in transformedBookmarks?.collections || []"
        :key="folder.id"
        :folder="folder"
        @select="handleSelectFolder"
      />

      <div class="flex items-center justify-end p-6 border-t border-stroke-1/10">
        <LoadingButton
          :action="handleMove"
          :isLoading="false"
          :disabled="!selectedFolderId"
          class="w-21.75 h-11 text-base font-medium leading-5.5 text-white -tracking-[1%] pt-2 px-4 rounded-full bg-black-100 hover:bg-black-90"
        >
          <span>Move</span>
        </LoadingButton>
      </div>
    </div>
  </ActionDialogWrapper>
</template>
