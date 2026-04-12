<script setup lang="ts">
import { computed } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUrlSearchParams } from '@vueuse/core';

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

const selectedPinnedBookmarks = ref<string[] | null>(null);

const selectedPinnedBookmarksLength = computed(() => selectedPinnedBookmarks.value?.length || 0);
</script>

<template>
  <AppWrapper page="Bookmark Folder">
    <ContentWrapper
      showTabActions
      :folderId="folderId"
    >
      <BookmarkTabWrapper
        v-model="activeTab"
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
