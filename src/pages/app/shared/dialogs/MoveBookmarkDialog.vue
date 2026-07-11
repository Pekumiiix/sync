<script setup lang="ts">
import { computed, ref } from 'vue';

import { LoadingButton } from '@/components/shared';
import { useBulkMoveBookmarks, useMoveBookmark } from '@/hooks/useBookmark';
import { useGetFolders } from '@/hooks/useFolder';
import type { ITransformedFolder } from '@/types/folder.type';
import { transformBookmarkFolders } from '@/utils/bookmarkUtils';
import { pluralizeIfArray } from '@/utils/stringutils';

import { FolderListItem } from '../components';
import { ActionDialogWrapper } from '../wrappers';

interface Props {
  bookmarkIds: string[] | string;
}

const props = defineProps<Props>();
const displayBool = defineModel<boolean>({ default: false });

const { data: foldersData } = useGetFolders();
const { mutate: moveBookmark, isPending } = useMoveBookmark();
const { mutate: bulkMoveBookmarks, isPending: isBulkMovePending } = useBulkMoveBookmarks();

const selectedFolderId = ref<string | null>(null);

const baseFolders = computed(() => transformBookmarkFolders(foldersData.value?.data));

const transformedBookmarksFolder = computed(() => {
  const folders = baseFolders.value;
  const targetId = selectedFolderId.value;

  const applySelection = (list: ITransformedFolder[]) =>
    list.map((folder) => ({
      ...folder,
      isSelected: folder.id === targetId
    }));

  return {
    systemFolders: applySelection(folders.systemFolders),
    ownedFolders: applySelection(folders.ownedFolders),
    sharedFolders: applySelection(folders.sharedFolders)
  };
});

function handleSelectFolder(folderId: string) {
  selectedFolderId.value = selectedFolderId.value === folderId ? null : folderId;
}

function handleMove() {
  if (!selectedFolderId.value) return;

  if (typeof props.bookmarkIds === 'string') {
    moveBookmark(
      { bookmarkId: props.bookmarkIds, folderId: selectedFolderId.value },
      {
        onSuccess: () => {
          displayBool.value = false;
        }
      }
    );
  } else if (Array.isArray(props.bookmarkIds)) {
    bulkMoveBookmarks(
      { bookmarkIds: props.bookmarkIds, folderId: selectedFolderId.value },
      {
        onSuccess: () => {
          displayBool.value = false;
        }
      }
    );
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
          @click="handleMove"
          :isLoading="isPending || isBulkMovePending"
          :disabled="!selectedFolderId"
          class="w-21.75 h-11 text-base font-medium leading-5.5 text-white -tracking-[1%] pt-2 px-4 rounded-full bg-black-100 hover:bg-black-90"
        >
          <span>Move</span>
        </LoadingButton>
      </div>
    </div>
  </ActionDialogWrapper>
</template>
