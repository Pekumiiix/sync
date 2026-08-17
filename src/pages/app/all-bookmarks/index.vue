<script setup lang="ts">
import { computed, onMounted, provide, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useGetAllBookmarks, useGetBookmarkBrowsers } from '@/hooks/useBookmark';
import { AppContextKey } from '@/keys/injenction-keys';
import type { BrowserProvider, SortOrder } from '@/types/app.type';
import { usePaginatedFilter } from '@/utils/paramUtils';
import { computeFolderTabs } from '@/utils/tabUtils';
import { toaster } from '@/utils/toastUtils';

import { AppWrapper } from '../shared';
import { PinnedBookmarks } from '../shared/sections';
import { BookmarkTabWrapper, ContentWrapper, QueryStateWrapper } from '../shared/wrappers';

const route = useRoute<'All Bookmarks'>();
const router = useRouter();

const params = reactive({
  tab: (route.query.tab as string) || 'all',
  page: Number(route.query.page as string) || 1,
  billing: route.query.billing as string
});

onMounted(() => {
  if (params.billing === 'success') {
    toaster.success('Upgrade complete! Your new plan is now active.');

    const { billing: _billing, ...remainingQuery } = route.query;

    router.replace({
      query: remainingQuery
    });
  }
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

const {
  data: bookmarksData,
  isLoading: isLoadingBookmarks,
  isError: isErrorBookmarks,
  refetch: refetchBookmarks
} = useGetAllBookmarks(queryParams);
const bookmarkBrowsersQuery = useGetBookmarkBrowsers();

const tabs = computeFolderTabs(() => bookmarkBrowsersQuery.data.value?.data.browsers || []);
</script>

<template>
  <AppWrapper page="All Bookmarks">
    <ContentWrapper type="all">
      <QueryStateWrapper
        :is-loading="isLoadingBookmarks"
        :is-error="isErrorBookmarks"
        loading-title="Fetching bookmarks"
        error-title="Failed to load bookmarks"
        error-message="There was an issue fetching your bookmarks. Please try again."
        @retry="refetchBookmarks"
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
