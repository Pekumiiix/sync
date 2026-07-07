// src/hooks/useSearch.ts
import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { keepPreviousData, useQuery } from '@tanstack/vue-query'; // <-- 1. Import it here

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { searchService } from '@/services/search.service';
import type { SearchBookmarksQueryParams, SearchFolderQueryParams } from '@/types/search.type';

/**
 * Hook to search bookmarks by keyword.
 */
export function useSearchBookmarks(params: MaybeRefOrGetter<SearchBookmarksQueryParams>) {
  return useQuery(
    computed(() => {
      const unwrappedParams = toValue(params);

      return {
        queryKey: QUERY_KEYS.search.bookmarks(unwrappedParams),
        queryFn: () => searchService.searchAllBookmarks(unwrappedParams),
        enabled: !!unwrappedParams.query && unwrappedParams.query.trim().length > 0,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
      };
    })
  );
}

/**
 * Hook to search bookmarks within a specific folder by keyword.
 */
export function useSearchFolderBookmarks(params: MaybeRefOrGetter<SearchFolderQueryParams>) {
  return useQuery(
    computed(() => {
      const unwrappedParams = toValue(params);

      return {
        queryKey: QUERY_KEYS.search.folderBookmarks(unwrappedParams),
        queryFn: () => searchService.searchFolderBookmarks(unwrappedParams),
        enabled:
          !!unwrappedParams.query &&
          unwrappedParams.query.trim().length > 0 &&
          unwrappedParams.folderId.length > 0,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
      };
    })
  );
}
