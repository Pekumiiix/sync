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
import { useLeaveFolder } from '@/hooks/useMember';
import { useSearchBookmarks, useSearchFolderBookmarks } from '@/hooks/useSearch';
import type { IFolderDetailsResponse } from '@/types/folder.type';
import type { MemberRole } from '@/types/member.type';
import { transformBookmarks } from '@/utils/bookmarkUtils';
import { computeUserName } from '@/utils/stringutils';

import { ListBookmarkCard, SearchInput } from '../components';
import { DeleteFolderDialog, FolderFormDialog, ShareFolderDialog } from '../dialogs';
import { QueryStateWrapper } from '.';

interface AllBookmarksProps {
  type: 'all';
  folder?: never;
  role?: never;
  previewMembers?: never;
}

interface FolderBookmarksProps {
  type: 'folder';
  folder: IFolderDetailsResponse['folder'];
  role: MemberRole;
  previewMembers: IFolderDetailsResponse['previewMembers'];
}

const props = defineProps<AllBookmarksProps | FolderBookmarksProps>();

const query = ref('');
const showShareDialog = ref(false);
const showEditFolderDialog = ref(false);
const showDeleteFolderDialog = ref(false);

const debouncedQuery = refDebounced(query, 400);

const isQueryEmpty = computed(() => query.value === '');
const isFolderScope = computed(() => props.type === 'folder');

const searchBookmarkQuery = useSearchBookmarks(() => ({
  query: isFolderScope.value ? '' : debouncedQuery.value
}));

const searchFolderBookmarkQuery = useSearchFolderBookmarks(() => ({
  query: isFolderScope.value ? debouncedQuery.value : '',
  folderId: props.folder?.id || ''
}));

const searchResults = computed(() => {
  const data = isFolderScope.value ? searchFolderBookmarkQuery.data : searchBookmarkQuery.data;

  if (!data.value?.data.bookmarks) return [];

  return transformBookmarks(data.value.data.bookmarks);
});

const isSearching = computed(() => {
  return isFolderScope.value ? searchFolderBookmarkQuery.isPending : searchBookmarkQuery.isPending;
});
const { mutate: leaveFolder, isPending: isLeavingFolder } = useLeaveFolder();

function handleDeleteFolder() {
  showDeleteFolderDialog.value = true;
}

function handleLeaveFolder() {
  if (props.type !== 'folder') return;

  leaveFolder({ folderId: props.folder.id });
}
</script>

<template>
  <section class="size-full h-full flex flex-col">
    <div
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

      <AnimatePresence v-if="type === 'folder' && isQueryEmpty && !folder.isSystem">
        <MotionStaggerContainer class="flex items-center gap-3">
          <MotionDiv
            :config="{ variants: fadeSlideYVariant }"
            class="size-fit flex items-center gap-1.5 bg-tertiary-background py-2.25 px-4 rounded-full"
          >
            <router-link
              :to="{ name: 'Members', params: { folderId: folder.id } }"
              class="flex items-center justify-center -space-x-1.5"
            >
              <BaseAvatar
                v-for="member in previewMembers"
                :key="member.id"
                :src="member.avatarUrl"
                :fallback="computeUserName(member.firstName, member.lastName)"
                class="size-6 shrink-0 outline-2 outline-contemporary-background"
              />
            </router-link>

            <p
              v-if="folder.memberCount > 3"
              class="text-xs font-medium leading-[100%] text-black-80"
            >
              {{ folder.memberCount }} members
            </p>
          </MotionDiv>

          <MotionButton
            v-if="role === 'owner'"
            :config="{ variants: fadeSlideYVariant }"
            @click="showEditFolderDialog = true"
            class="h-9.5 flex items-center text-sm font-medium leading-4.75 text-black-70 gap-1.75 px-3 py-3.5 rounded-full bg-tertiary-background hover:bg-black-10/70"
          >
            <EditIcon class="stroke-black-70" />
            Edit
          </MotionButton>

          <LoadingButton
            :config="{ variants: fadeSlideYVariant }"
            :is-loading="isLeavingFolder"
            @click="role === 'owner' ? handleDeleteFolder() : handleLeaveFolder()"
            class="h-9.5 flex items-center text-sm font-medium leading-4.75 text-danger-100 gap-1.75 px-3 py-3.5 rounded-full bg-[#FF2F000A] hover:bg-danger-100/10"
          >
            <TrashIcon
              v-if="role === 'owner'"
              class="stroke-danger-100"
            />
            <LeaveIcon
              v-else
              class="stroke-danger-100"
            />

            {{ role === 'owner' ? 'Delete' : 'Leave' }}
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
    </div>

    <slot v-if="isQueryEmpty" />

    <div
      v-else
      class="w-full h-full flex flex-col"
    >
      <QueryStateWrapper
        :is-empty="!searchResults.length"
        :is-loading="isSearching.value"
        empty-title="No bookmarks found"
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
  </section>

  <ShareFolderDialog
    v-if="type === 'folder'"
    v-model="showShareDialog"
    :folder-id="folder.id"
    :is-protected="folder.isProtected"
    :member-count="folder.memberCount"
  />

  <FolderFormDialog
    v-if="type === 'folder'"
    v-model="showEditFolderDialog"
    :folder-id="folder.id"
    :name="folder.name"
    type="edit"
  />

  <DeleteFolderDialog
    v-if="type === 'folder'"
    v-model="showDeleteFolderDialog"
    :folder-id="folder.id"
  />
</template>
