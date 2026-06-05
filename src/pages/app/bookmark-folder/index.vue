<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUrlSearchParams } from '@vueuse/core';

import { bookmarks } from '@/mock-data/bookmark';
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

const { pinnedBookmarks, selectedPinnedBookmarks, selectedPinnedBookmarksLength } =
  extractPinnedBookmarksData(bookmarks);
</script>

<template>
  <AppWrapper page="Bookmark Folder">
    <ContentWrapper
      showTabActions
      :folderId="folderId"
    >
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
