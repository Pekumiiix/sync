<script setup lang="ts">
import { computed, ref } from 'vue';

import { AppWrapper } from '../shared';
import { PinnedBookmarks } from './sections';
import { BookmarkTabWrapper, ContentWrapper } from './wrappers';

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

const selectedPinnedBookmarks = ref<string[] | null>(null);

const selectedPinnedBookmarksLength = computed(() => selectedPinnedBookmarks.value?.length || 0);
</script>

<template>
  <AppWrapper page="All Bookmarks">
    <ContentWrapper>
      <BookmarkTabWrapper
        defaultValue="all"
        :tabs="tabs"
        :selectedBookmarksLength="selectedPinnedBookmarksLength"
      >
        <PinnedBookmarks
          v-model="selectedPinnedBookmarks"
          :selectedPinnedBookmarksLength="selectedPinnedBookmarksLength"
        />
      </BookmarkTabWrapper>
    </ContentWrapper>
  </AppWrapper>
</template>
