<script setup lang="ts">
import { computed, ref } from 'vue';
import { refDebounced } from '@vueuse/core';
import { Upload } from 'lucide-vue-next';
import { AnimatePresence } from 'motion-v';

import { fadeSlideYConfig, fadeSlideYVariant } from '@/components/constants/animations';
import { EditIcon, LeaveIcon, TrashIcon } from '@/components/icons';
import {
  MotionButton,
  MotionParagraph,
  MotionStaggerContainer
} from '@/components/motion-wrappers';
import { MotionDiv } from '@/components/motion-wrappers';
import { BaseAvatar } from '@/components/re-useable';
import { LoadingButton } from '@/components/shared';
import { useDeleteFolder } from '@/hooks/useFolder';
import { useLeaveFolder } from '@/hooks/useMember';
import { useSearchBookmarks, useSearchFolderBookmarks } from '@/hooks/useSearch';
import type { IFolderBookmarksResponse } from '@/types/folder.type';
import { transformBookmarks } from '@/utils/bookmarkUtils';

import { ListBookmarkCard, SearchInput } from '../components';
import { FolderFormDialog, ShareFolderDialog } from '../dialogs';
import { QueryStateWrapper } from '.';

interface Props {
  showTabActions?: boolean;
  folder?: {
    id: IFolderBookmarksResponse['folder']['id'];
    name: IFolderBookmarksResponse['folder']['name'];
    previewMembers: IFolderBookmarksResponse['previewMembers'];
    memberCount: IFolderBookmarksResponse['folder']['memberCount'];
    isSystem: IFolderBookmarksResponse['folder']['isSystem'];
    isProtected: IFolderBookmarksResponse['folder']['isProtected'];
    role: IFolderBookmarksResponse['permission']['role'];
  };
}

const props = withDefaults(defineProps<Props>(), {
  showTabActions: false
});

const query = ref('');
const showShareDialog = ref(false);
const showEditFolderDialog = ref(false);

const debouncedQuery = refDebounced(query, 400);

const isQueryEmpty = computed(() => query.value === '');
const isFolderScope = computed(() => !!props.folder?.id);

const { data: searchBookmarkData, isPending: isSearchingForBookmark } = useSearchBookmarks(() => ({
  query: isFolderScope.value ? '' : debouncedQuery.value
}));

const { data: searchFolderBookmarkData, isPending: isSearchingFolder } = useSearchFolderBookmarks(
  () => ({
    query: isFolderScope.value ? debouncedQuery.value : '',
    folderId: props.folder?.id || ''
  })
);

const { mutate: deleteFolder, isPending: isDeletingFolder } = useDeleteFolder();
const { mutate: leaveFolder, isPending: isLeavingFolder } = useLeaveFolder();

function handleDeleteFolder() {
  if (!props.folder?.id) return;

  deleteFolder({ folderId: props.folder.id });
}

function handleLeaveFolder() {
  if (!props.folder?.id) return;

  leaveFolder({ folderId: props.folder.id });
}

const searchResults = computed(() => {
  const data = isFolderScope.value ? searchFolderBookmarkData.value : searchBookmarkData.value;

  if (!data?.data?.bookmarks) return [];

  return transformBookmarks(data.data.bookmarks);
});
</script>

<template>
  <section
    class="w-full h-fit flex items-center justify-between py-6 px-6.5 border-b border-[#292D321A]"
  >
    <SearchInput
      v-model="query"
      placeholder="Search bookmarks"
    />

    <AnimatePresence>
      <MotionParagraph
        v-if="!isQueryEmpty"
        :config="fadeSlideYConfig"
        class="text-sm text-muted-foreground"
      >
        Showing result for “{{ query }}”
      </MotionParagraph>
    </AnimatePresence>

    <AnimatePresence
      v-if="folder && isQueryEmpty && showTabActions && folder.id && !folder.isSystem"
    >
      <MotionStaggerContainer
        v-if="isQueryEmpty && showTabActions && folder?.id"
        class="flex items-center gap-3"
      >
        <MotionDiv
          :config="{ variants: fadeSlideYVariant }"
          class="size-fit flex items-center gap-1.5 bg-tertiary-background py-2.25 px-4 rounded-full"
        >
          <router-link
            :to="`/app/${folder?.id}/members`"
            class="flex items-center justify-center -space-x-1.5"
          >
            <BaseAvatar
              v-for="member in folder.previewMembers"
              :key="member.id"
              :src="member.avatarUrl"
              :fallback="member.lastName"
              class="size-6 shrink-0 outline-2 outline-contemporary-background"
            />
          </router-link>

          <p
            v-if="folder.memberCount > 3"
            class="text-xs font-medium leading-[100%] text-black-80"
          >
            {{ folder?.memberCount }} members
          </p>
        </MotionDiv>

        <MotionButton
          v-if="folder.role === 'owner' && !folder.isSystem"
          :config="{ variants: fadeSlideYVariant }"
          :is-loading="isDeletingFolder"
          @click="showEditFolderDialog = true"
          class="h-9.5 flex items-center text-sm font-medium leading-4.75 text-black-70 gap-1.75 px-3 py-3.5 rounded-full bg-tertiary-background hover:bg-black-10/70"
        >
          <EditIcon class="stroke-black-70" />
          Edit
        </MotionButton>

        <LoadingButton
          v-if="folder.role === 'owner' && !folder.isSystem"
          :config="{ variants: fadeSlideYVariant }"
          :is-loading="isDeletingFolder"
          @click="handleDeleteFolder"
          class="h-9.5 flex items-center text-sm font-medium leading-4.75 text-danger-100 gap-1.75 px-3 py-3.5 rounded-full bg-[#FF2F000A] hover:bg-danger-100/10"
        >
          <TrashIcon class="stroke-danger-100" />
          Delete
        </LoadingButton>

        <LoadingButton
          v-if="folder.role !== 'owner' && !folder.isSystem"
          :config="{ variants: fadeSlideYVariant }"
          :is-loading="isLeavingFolder"
          @click="handleLeaveFolder"
          class="h-9.5 flex items-center text-sm font-medium leading-4.75 text-danger-100 gap-1.75 px-3 py-3.5 rounded-full bg-[#FF2F000A] hover:bg-danger-100/10"
        >
          <LeaveIcon class="stroke-danger-100" />
          Leave
        </LoadingButton>

        <MotionButton
          :config="{ variants: fadeSlideYVariant }"
          @click="showShareDialog = true"
          class="w-fit h-9.5 flex items-center gap-2 py-3 px-4 rounded-full"
        >
          <Upload
            :size="20"
            class="text-inherit"
          />
          <span class="text-xs font-medium">Share</span>
        </MotionButton>
      </MotionStaggerContainer>
    </AnimatePresence>
  </section>

  <slot v-if="isQueryEmpty" />

  <div
    v-else
    class="w-full h-full flex flex-col"
  >
    <QueryStateWrapper
      :is-empty="!searchResults.length"
      :is-loading="isSearchingFolder || isSearchingForBookmark"
    >
      <ListBookmarkCard
        v-for="bookmark in searchResults"
        v-model="bookmark.isSelected"
        :key="bookmark.id"
        :bookmark="bookmark"
        :showCheckbox="false"
      />
    </QueryStateWrapper>
  </div>

  <ShareFolderDialog
    v-if="folder"
    v-model="showShareDialog"
    :folder-id="folder.id"
    :is-protected="folder.isProtected"
  />

  <FolderFormDialog
    v-if="folder"
    v-model="showEditFolderDialog"
    :folder-id="folder.id"
    :name="folder.name"
    type="edit"
  />
</template>
