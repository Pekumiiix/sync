<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUrlSearchParams } from '@vueuse/core';

import { useGetBookmarkBrowsers } from '@/hooks/useBookmark';
import { useGetFolderBookmarks } from '@/hooks/useFolder';
import { mockFolderBookmarksResponse } from '@/mock-data/bookmark-folder';
import type { BrowserProvider, SortOrder } from '@/types/app.type';
import { extractPinnedBookmarksData } from '@/utils/bookmarkUtils';

import { AppWrapper } from '../shared';
import { PinnedBookmarks } from '../shared/sections';
import { BookmarkTabWrapper, ContentWrapper } from '../shared/wrappers';

const route = useRoute();
const params = useUrlSearchParams('history');

const sortOrder = ref<SortOrder>('title_desc');

const folderId = computed(() => route.params.folderId as string);

const activeTab = computed({
  get: () => (params.tab as string) || 'all',
  set: (newValue) => {
    params.tab = newValue;
  }
});

const queryParams = computed(() => ({
  page: 1,
  limit: 10,
  filter: activeTab.value as BrowserProvider | 'all',
  sort: sortOrder.value
}));

const { data: folderBookmarksData } = useGetFolderBookmarks(() => ({
  folderId: folderId.value,
  param: queryParams.value
}));
const { data: bookmarkBrowsersData } = useGetBookmarkBrowsers();

const folderData = computed(() => folderBookmarksData.value?.data?.folder);

const tabs = computed(() => {
  const browsers = bookmarkBrowsersData.value?.data.browsers || [];
  return [
    {
      label: 'All',
      value: 'all' as const
    },
    ...browsers.map((browser) => ({
      label: browser.browser,
      value: browser.browser
    }))
  ];
});

const { selectedPinnedBookmarks, selectedPinnedBookmarksLength } = extractPinnedBookmarksData();
</script>

<template>
  <AppWrapper :page="`${mockFolderBookmarksResponse.folder.name} Folder`">
    <ContentWrapper
      showTabActions
      :folderId="folderId"
      :folder="{
        id: folderData?.id || '',
        previewMembers: folderBookmarksData?.data.previewMembers || [],
        memberCount: folderData?.memberCount || 0,
        isSystem: folderData?.isSystem || false,
        isProtected: folderData?.isProtected || false,
        role: folderBookmarksData?.data.permission.role || 'member'
      }"
    >
      <BookmarkTabWrapper
        v-model:activeTab="activeTab"
        v-model:selectedPinnedBookmarks="selectedPinnedBookmarks"
        :tabs="tabs"
        :bookmarks="folderBookmarksData?.data.bookmarks || []"
        :selectedPinnedBookmarksLength="selectedPinnedBookmarksLength"
      >
        <PinnedBookmarks
          v-model="selectedPinnedBookmarks"
          :pinnedBookmarks="folderBookmarksData?.data.pinnedBookmarks || []"
          :selectedPinnedBookmarksLength="selectedPinnedBookmarksLength"
        />
      </BookmarkTabWrapper>
    </ContentWrapper>
  </AppWrapper>
</template>
