<script setup lang="ts">
import { computed } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';

import { bookmarks } from '@/mock-data/bookmark';
import { extractPinnedBookmarksData } from '@/utils/bookmarkUtils';

import { AppWrapper } from '../shared';
import { PinnedBookmarks } from '../shared/sections';
import { BookmarkTabWrapper, ContentWrapper } from '../shared/wrappers';

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

const { pinnedBookmarks, selectedPinnedBookmarks, selectedPinnedBookmarksLength } =
  extractPinnedBookmarksData(bookmarks);

const params = useUrlSearchParams('history');

const activeTab = computed({
  get: () => (params.tab as string) || 'all',
  set: (newValue) => {
    params.tab = newValue;
  }
});
</script>

<template>
  <AppWrapper page="All Bookmarks">
    <ContentWrapper>
      <p>{{ selectedPinnedBookmarksLength }}</p>

      <BookmarkTabWrapper
        :tabs="tabs"
        :bookmarks="bookmarks"
        v-model:activeTab="activeTab"
        v-model:selectedPinnedBookmarks="selectedPinnedBookmarks"
        :selectedPinnedBookmarksLength="selectedPinnedBookmarksLength"
      >
        <PinnedBookmarks
          v-model="selectedPinnedBookmarks"
          :pinnedBookmarks="pinnedBookmarks"
          :selectedPinnedBookmarksLength="selectedPinnedBookmarksLength"
        />
      </BookmarkTabWrapper>
    </ContentWrapper>
  </AppWrapper>
</template>
