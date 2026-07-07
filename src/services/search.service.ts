import type { IApiResponse } from '@/types/api.type';
import type {
  ISearchResponse,
  SearchBookmarksQueryParams,
  SearchFolderQueryParams
} from '@/types/search.type';
import { apiClient } from '@/utils/apiUtils';

class SearchService {
  searchAllBookmarks(payload: SearchBookmarksQueryParams) {
    return apiClient<IApiResponse<ISearchResponse>>('get', '/search/bookmarks', payload);
  }

  searchFolderBookmarks(payload: SearchFolderQueryParams) {
    const { folderId, ...data } = payload;

    return apiClient<IApiResponse<ISearchResponse>>('get', `/search/${folderId}`, data);
  }
}

export const searchService = new SearchService();
