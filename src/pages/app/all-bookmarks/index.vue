<script setup lang="ts">
import { computed } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';

import { mockBookmarksResponse } from '@/mock-data/bookmarks';
import { extractPinnedBookmarksData } from '@/utils/bookmarkUtils';

import { AppWrapper } from '../shared';
import { PinnedBookmarks } from '../shared/sections';
import { BookmarkTabWrapper, ContentWrapper } from '../shared/wrappers';

const { selectedPinnedBookmarks, selectedPinnedBookmarksLength } = extractPinnedBookmarksData();

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
      <BookmarkTabWrapper
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
