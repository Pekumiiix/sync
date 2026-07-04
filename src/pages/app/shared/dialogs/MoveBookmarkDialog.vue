<script setup lang="ts">
import { ref } from 'vue';

import { LoadingButton } from '@/components/shared';
import { useMoveBookmark } from '@/hooks/useBookmark';
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

const transformedBookmarksFolder = ref(transformBookmarkFolders(mockFoldersResponse));
const selectedFolderId = ref<string | null>(null);

const displayBool = defineModel<boolean>({ default: false });

function handleSelectFolder(folderId: string) {
  const isDeselecting = selectedFolderId.value === folderId;

  const updateSelection = (folders: ITransformedFolder[]) =>
    folders.map((folder) => ({
      ...folder,
      isSelected: folder.id === folderId ? !isDeselecting : false
    }));

  transformedBookmarksFolder.value = {
    systemFolders: updateSelection(transformedBookmarksFolder.value.systemFolders),
    ownedFolders: updateSelection(transformedBookmarksFolder.value.ownedFolders),
    sharedFolders: updateSelection(transformedBookmarksFolder.value.sharedFolders)
  };

  selectedFolderId.value = isDeselecting ? null : folderId;
}

const { mutate: moveBookmark, isPending } = useMoveBookmark();

function handleMove() {
  if (!selectedFolderId.value || typeof props.bookmarkIds !== 'string') return;

  moveBookmark(
    { bookmarkId: props.bookmarkIds, folderId: selectedFolderId.value },
    {
      onSuccess: () => {
        displayBool.value = false;
      }
    }
  );
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
        v-for="folder in transformedBookmarksFolder?.systemFolders || []"
        :key="folder.id"
        :folder="folder"
        @select="handleSelectFolder"
      />

      <FolderListItem
        v-for="folder in transformedBookmarksFolder?.ownedFolders || []"
        :key="folder.id"
        :folder="folder"
        @select="handleSelectFolder"
      />

      <FolderListItem
        v-for="folder in transformedBookmarksFolder?.sharedFolders || []"
        :key="folder.id"
        :folder="folder"
        @select="handleSelectFolder"
      />

      <div class="flex items-center justify-end p-6 border-t border-stroke-1/10">
        <LoadingButton
          :action="handleMove"
          :isLoading="isPending"
          :disabled="!selectedFolderId"
          class="w-21.75 h-11 text-base font-medium leading-5.5 text-white -tracking-[1%] pt-2 px-4 rounded-full bg-black-100 hover:bg-black-90"
        >
          <span>Move</span>
        </LoadingButton>
      </div>
    </div>
  </ActionDialogWrapper>
</template>
