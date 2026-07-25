<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';

import { useGetAllBookmarks, useGetBookmarkBrowsers } from '@/hooks/useBookmark';
import type { BrowserProvider, SortOrder } from '@/types/app.type';

import { AppWrapper } from '../shared';
import { PinnedBookmarks } from '../shared/sections';
import { BookmarkTabWrapper, ContentWrapper, QueryStateWrapper } from '../shared/wrappers';

const params = useUrlSearchParams('history');

const sortOrder = ref<SortOrder>('title_desc');

const currentPage = computed<number>({
  get: () => Number(params.page) || 1,
  set: (newValue) => {
    params.page = String(newValue);
  }
});

const activeTab = computed({
  get: () => (params.tab as string) || 'all',
  set: (newValue) => {
    params.tab = newValue;
    currentPage.value = 1;
  }
});

const queryParams = computed(() => ({
  page: currentPage.value,
  limit: 10,
  filter: activeTab.value as BrowserProvider | 'all',
  sort: sortOrder.value
}));

const { data: bookmarksData, isLoading: isLoadingBookmarks } = useGetAllBookmarks(queryParams);
const { data: bookmarkBrowsersData } = useGetBookmarkBrowsers();

const tabs = computed(() => {
  const browsers = bookmarkBrowsersData.value?.data.browsers || [];
  return [
    { label: 'All', value: 'all' as const },
    ...browsers.map((browser) => ({
      label: browser.browser,
      value: browser.browser
    }))
  ];
});
</script>

<template>
  <AppWrapper page="All Bookmarks">
    <ContentWrapper>
      <QueryStateWrapper
        :is-loading="isLoadingBookmarks"
        loading-title="Fetching bookmarks"
      >
        <BookmarkTabWrapper
          v-model:page="currentPage"
          v-model:activeTab="activeTab"
          v-model:sortOrder="sortOrder"
          :tabs="tabs"
          :bookmarks="bookmarksData?.data.bookmarks || []"
          :total="bookmarksData?.data.meta.totalCount || 1"
        >
          <PinnedBookmarks
            v-if="bookmarksData?.data.pinnedBookmarks.length"
            :pinnedBookmarks="bookmarksData?.data.pinnedBookmarks || []"
          />
        </BookmarkTabWrapper>
      </QueryStateWrapper>
    </ContentWrapper>
  </AppWrapper>
</template>
