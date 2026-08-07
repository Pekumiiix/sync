<script setup lang="ts">
import { computed, provide, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useGetBookmarkBrowsers } from '@/hooks/useBookmark';
import { useGetFolderBookmarks } from '@/hooks/useFolder';
import { AppContextKey } from '@/keys/injenction-keys';
import type { BrowserProvider, SortOrder } from '@/types/app.type';
import { usePaginatedFilter } from '@/utils/paramUtils';
import { computeFolderTabs } from '@/utils/tabUtils';

import { AppWrapper } from '../shared';
import { ErrorState } from '../shared/query-states';
import { PinnedBookmarks } from '../shared/sections';
import { BookmarkTabWrapper, ContentWrapper, QueryStateWrapper } from '../shared/wrappers';

const route = useRoute<'Bookmark Folder'>();

const folderId = computed(() => route.params.folderId as string);

const params = reactive({
  tab: (route.query.tab as string) || 'all',
  page: Number(route.query.page as string) || 1
});

const sortOrder = ref<SortOrder>('title_desc');
const selectedPinnedBookmarks = ref<string[] | null>(null);

const currentPage = usePaginatedFilter(params, 'page', 1);
const activeTab = usePaginatedFilter(params, 'tab', 'all', currentPage);

const queryParams = computed(() => ({
  page: currentPage.value,
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
const bookmarkBrowsersQuery = useGetBookmarkBrowsers(() => ({
  folderId: folderId.value
}));

const folderData = computed(() => folderBookmarksData.value?.data?.folder);

const tabs = computeFolderTabs(() => bookmarkBrowsersQuery.data.value?.data.browsers || []);

const appContext = computed(() => ({
  canCreateBookmarks: folderBookmarksData.value?.data.permission.accessLevel === 'editor'
}));

provide(AppContextKey, appContext);
</script>

<template>
  <AppWrapper :page="`${folderData?.name || 'Untitled'} Folder`">
    <QueryStateWrapper
      :isLoading="isLoading"
      :isError="isError"
      loading-title="Loading folder"
    >
      <ContentWrapper
        v-if="folderData"
        type="folder"
        :folder="folderData"
        :role="folderBookmarksData?.data.permission.role || 'member'"
        :previewMembers="folderBookmarksData?.data.previewMembers || []"
      >
        <BookmarkTabWrapper
          v-model:page="currentPage"
          v-model:activeTab="activeTab"
          v-model:sortOrder="sortOrder"
          v-model:selectedPinnedBookmarks="selectedPinnedBookmarks"
          :tabs="tabs"
          :bookmarks="folderBookmarksData?.data.bookmarks || []"
          :total="folderBookmarksData?.data.meta.totalCount || 0"
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
          message="It looks like you don't have permission to view this page. If you believe this is an error, please contact the folder owner."
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
