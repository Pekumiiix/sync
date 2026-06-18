import type {
  ISearchFolderBookmarksResponse,
  SearchFolderBookmarksQueryParams
} from '@/types/search.type';
import { apiClient } from '@/utils/apiUtils';

class SearchService {
  searchByKeyword(payload: SearchFolderBookmarksQueryParams) {
    return apiClient<ISearchFolderBookmarksResponse>('post', '/search/bookmarks', payload);
  }
}

export const searchService = new SearchService();
