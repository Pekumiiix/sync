<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUrlSearchParams } from '@vueuse/core';

import { mockFolderBookmarksResponse } from '@/mock-data/bookmark-folder';
import { extractPinnedBookmarksData } from '@/utils/bookmarkUtils';

import { AppWrapper } from '../shared';
import { PinnedBookmarks } from '../shared/sections';
import { BookmarkTabWrapper, ContentWrapper } from '../shared/wrappers';

const route = useRoute();
const params = useUrlSearchParams('history');

const folderId = computed(() => route.params.folderId as string);

const activeTab = computed({
  get: () => (params.tab as string) || 'all',
  set: (newValue) => {
    params.tab = newValue;
  }
});

const { selectedPinnedBookmarks, selectedPinnedBookmarksLength } = extractPinnedBookmarksData();
</script>

<template>
  <AppWrapper :page="`${mockFolderBookmarksResponse.folder.name} Folder`">
    <ContentWrapper
      showTabActions
      :folderId="folderId"
      :folder="mockFolderBookmarksResponse.folder"
    >
      <BookmarkTabWrapper
        :bookmarks="mockFolderBookmarksResponse.data.data"
        v-model:activeTab="activeTab"
        v-model:selectedPinnedBookmarks="selectedPinnedBookmarks"
        :selectedPinnedBookmarksLength="selectedPinnedBookmarksLength"
      >
        <PinnedBookmarks
          v-model="selectedPinnedBookmarks"
          :pinnedBookmarks="mockFolderBookmarksResponse.data.pinned"
          :selectedPinnedBookmarksLength="selectedPinnedBookmarksLength"
        />
      </BookmarkTabWrapper>
    </ContentWrapper>
  </AppWrapper>
</template>
