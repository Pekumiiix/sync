<script setup lang="ts">
import { computed, provide, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useGetAllBookmarks, useGetBookmarkBrowsers } from '@/hooks/useBookmark';
import { AppContextKey } from '@/keys/injenction-keys';
import type { BrowserProvider, SortOrder } from '@/types/app.type';
import { usePaginatedFilter } from '@/utils/paramUtils';
import { computeFolderTabs } from '@/utils/tabUtils';

import { AppWrapper } from '../shared';
import { PinnedBookmarks } from '../shared/sections';
import { BookmarkTabWrapper, ContentWrapper, QueryStateWrapper } from '../shared/wrappers';

const route = useRoute<'All Bookmarks'>();

const params = reactive({
  tab: (route.query.tab as string) || 'all',
  page: Number(route.query.page as string) || 1
});

const appContext = ref({
  canCreateBookmarks: true
});

provide(AppContextKey, appContext);

const sortOrder = ref<SortOrder>('title_desc');

const currentPage = usePaginatedFilter(params, 'page', 1);
const activeTab = usePaginatedFilter(params, 'tab', 'all', currentPage);

const queryParams = computed(() => ({
  page: currentPage.value,
  limit: 10,
  filter: activeTab.value as BrowserProvider | 'all',
  sort: sortOrder.value
}));

const { data: bookmarksData, isLoading: isLoadingBookmarks } = useGetAllBookmarks(queryParams);
const bookmarkBrowsersQuery = useGetBookmarkBrowsers();

const tabs = computeFolderTabs(() => bookmarkBrowsersQuery.data.value?.data.browsers || []);
</script>

<template>
  <AppWrapper page="All Bookmarks">
    <ContentWrapper type="all">
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
          :total="bookmarksData?.data.meta.totalCount || 0"
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
