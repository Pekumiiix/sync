<script setup lang="ts">
import { ref } from 'vue';

import { bookmarks } from '@/mock-data/bookmark';
import type { DisplayType, SortOrder } from '@/types/app.type';

import { AppWrapper, ContentWrapper } from '../shared';
import { BookmarkTabWrapper } from './components';
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
</script>

<template>
  <AppWrapper page="All Bookmarks">
    <ContentWrapper>
      <BookmarkTabWrapper
        defualtValue="all"
        :tabs="tabs"
        v-model:displayType="displayType"
        v-model:sortOrder="sortOrder"
      >
        <PinnedBookmarks />

        <template #all>
          <BookmarkTabContentWrapper
            platform="All"
            :displayType="displayType"
            :bookmarks="bookmarks"
          />
        </template>

        <template #chrome>
          <BookmarkTabContentWrapper
            platform="Chrome"
            :displayType="displayType"
            :bookmarks="bookmarks"
          />
        </template>
      </BookmarkTabWrapper>
    </ContentWrapper>
  </AppWrapper>
</template>
