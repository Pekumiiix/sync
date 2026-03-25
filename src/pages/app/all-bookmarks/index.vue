<script setup lang="ts">
import { computed, ref } from 'vue';

import { bookmarks } from '@/mock-data/bookmark';
import type { DisplayType, SortOrder } from '@/types/app.type';

import { AppWrapper, ContentWrapper } from '../shared';
import { BookmarkTabWrapper } from './components';
import { transformBookmarks } from './helper';
import { BookmarkTabContentWrapper, PinnedBookmarks } from './sections';

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

const displayType = ref<DisplayType>('list');
const sortOrder = ref<SortOrder>('a-z');

const transformedBookmarks = ref(transformBookmarks(bookmarks));

const pinnedBookmarks = ref(transformedBookmarks.value.filter((bookmark) => bookmark.isPinned));

const selectedBookmarks = computed(() => {
  return transformedBookmarks.value.filter((b) => b.isSelected);
});
const selectedBookmarksLength = computed(() => selectedBookmarks.value?.length || 0);
const allSelectedBookmarksArePinned = computed(() => {
  if (selectedBookmarksLength.value === 0) return false;

  return selectedBookmarks.value.every((b) => b.isPinned);
});
</script>

<template>
  <AppWrapper page="All Bookmarks">
    <ContentWrapper>
      <BookmarkTabWrapper
        defualtValue="all"
        :tabs="tabs"
        v-model:displayType="displayType"
        v-model:sortOrder="sortOrder"
        :selectedBookmarksLength="selectedBookmarksLength"
        :allSelectedBookmarksArePinned="allSelectedBookmarksArePinned || false"
      >
        <PinnedBookmarks
          :selectedBookmarksLength="selectedBookmarksLength"
          :pinnedBookmarks="pinnedBookmarks"
        />

        <template #all>
          <BookmarkTabContentWrapper
            platform="All"
            v-model="selectedBookmarks"
            :displayType="displayType"
            :bookmarks="transformedBookmarks"
          />
        </template>

        <template #chrome>
          <BookmarkTabContentWrapper
            platform="Chrome"
            v-model="selectedBookmarks"
            :displayType="displayType"
            :bookmarks="transformedBookmarks"
          />
        </template>
      </BookmarkTabWrapper>
    </ContentWrapper>
  </AppWrapper>
</template>
