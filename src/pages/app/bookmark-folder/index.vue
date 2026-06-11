<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUrlSearchParams } from '@vueuse/core';

import { mockBookmarksResponse } from '@/mock-data/bookmarks';
import { extractPinnedBookmarksData } from '@/utils/bookmarkUtils';

import { AppWrapper } from '../shared';
import { PinnedBookmarks } from '../shared/sections';
import { BookmarkTabWrapper, ContentWrapper } from '../shared/wrappers';

const route = useRoute();
const params = useUrlSearchParams('history');

const folderId = computed(() => route.params.folderId as string);

const tabs = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Chrome',
    value: 'chrome'
  }
];

const activeTab = computed({
  get: () => (params.tab as string) || 'all',
  set: (newValue) => {
    params.tab = newValue;
  }
});

const { selectedPinnedBookmarks, selectedPinnedBookmarksLength } = extractPinnedBookmarksData();
</script>

<template>
  <AppWrapper page="Bookmark Folder">
    <ContentWrapper
      showTabActions
      :folderId="folderId"
    >
      <BookmarkTabWrapper
        :tabs="tabs"
        :bookmarks="mockBookmarksResponse.data"
        v-model:activeTab="activeTab"
        v-model:selectedPinnedBookmarks="selectedPinnedBookmarks"
        :selectedPinnedBookmarksLength="selectedPinnedBookmarksLength"
      >
        <PinnedBookmarks
          v-model="selectedPinnedBookmarks"
          :pinnedBookmarks="mockBookmarksResponse.pinned"
          :selectedPinnedBookmarksLength="selectedPinnedBookmarksLength"
        />
      </BookmarkTabWrapper>
    </ContentWrapper>
  </AppWrapper>
</template>
