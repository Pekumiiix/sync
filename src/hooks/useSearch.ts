// src/hooks/useSearch.ts
import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { keepPreviousData, useQuery } from '@tanstack/vue-query'; // <-- 1. Import it here

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { searchService } from '@/services/serach.services';
import type { SearchFolderBookmarksQueryParams } from '@/types/search.type';

/**
 * Hook to search bookmarks by keyword.
 */
export function useSearchBookmarks(params: MaybeRefOrGetter<SearchFolderBookmarksQueryParams>) {
  return useQuery(
    computed(() => {
      const unwrappedParams = toValue(params);

      return {
        queryKey: QUERY_KEYS.search.bookmarks(unwrappedParams),
        queryFn: () => searchService.searchByKeyword(unwrappedParams),
        enabled: !!unwrappedParams.query && unwrappedParams.query.trim().length > 0,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
      };
    })
  );
}
