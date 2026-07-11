<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUrlSearchParams } from '@vueuse/core';

import { useGetBookmarkBrowsers } from '@/hooks/useBookmark';
import { useGetFolderBookmarks } from '@/hooks/useFolder';
import type { BrowserProvider, SortOrder } from '@/types/app.type';

import { AppWrapper } from '../shared';
import { PinnedBookmarks } from '../shared/sections';
import { BookmarkTabWrapper, ContentWrapper } from '../shared/wrappers';

const route = useRoute();
const params = useUrlSearchParams('history');

const sortOrder = ref<SortOrder>('title_desc');
const selectedPinnedBookmarks = ref<string[] | null>(null);

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
const { data: bookmarkBrowsersData } = useGetBookmarkBrowsers({ folderId: folderId.value });

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
</script>

<template>
  <AppWrapper :page="`${folderData?.name || 'Untitled'} Folder`">
    <ContentWrapper
      showTabActions
      :folderId="folderId"
      :folder="{
        id: folderData?.id || '',
        name: folderData?.name || '',
        previewMembers: folderBookmarksData?.data.previewMembers || [],
        memberCount: folderData?.memberCount || 0,
        isSystem: folderData?.isSystem || false,
        isProtected: folderData?.isProtected || false,
        role: folderBookmarksData?.data.permission.role || 'member'
      }"
    >
      <BookmarkTabWrapper
        v-model:activeTab="activeTab"
        v-model:sortOrder="sortOrder"
        v-model:selectedPinnedBookmarks="selectedPinnedBookmarks"
        :tabs="tabs"
        :bookmarks="folderBookmarksData?.data.bookmarks || []"
      >
        <PinnedBookmarks
          v-if="folderBookmarksData?.data.pinnedBookmarks.length"
          v-model="selectedPinnedBookmarks"
          :pinnedBookmarks="folderBookmarksData?.data.pinnedBookmarks || []"
        />
      </BookmarkTabWrapper>
    </ContentWrapper>
  </AppWrapper>
</template>
