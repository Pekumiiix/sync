<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUrlSearchParams } from '@vueuse/core';

import { useGetBookmarkBrowsers } from '@/hooks/useBookmark';
import { useGetFolderBookmarks } from '@/hooks/useFolder';
import type { BrowserProvider, SortOrder } from '@/types/app.type';

import { AppWrapper } from '../shared';
import { ErrorState } from '../shared/query-states';
import { PinnedBookmarks } from '../shared/sections';
import { BookmarkTabWrapper, ContentWrapper, QueryStateWrapper } from '../shared/wrappers';

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

const {
  data: folderBookmarksData,
  isLoading,
  isError,
  error
} = useGetFolderBookmarks(() => ({
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
    <QueryStateWrapper
      :isLoading="isLoading"
      :isError="isError"
      loading-title="Loading folder"
    >
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

      <template #error>
        <ErrorState
          v-if="error?.statusCode === 403"
          :code="403"
          title="Access Denied"
          message="It looks like you don't have permission to view this page. Check your account settings or head back home."
        />

        <ErrorState
          v-else-if="error?.statusCode === 404"
          :code="404"
          title="Folder Not Found"
          message="The folder you are looking for does not exist. It may have been deleted or the link is incorrect."
        />
      </template>
    </QueryStateWrapper>
  </AppWrapper>
</template>
