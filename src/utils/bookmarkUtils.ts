import { computed, ref } from 'vue';

import type { IBookmarkCard, IFolderCard } from '@/types/app.type';
import { timeAgo } from '@/utils/dateUtils';

export function transformBookmarks(bookmarks: IBookmarkCard[]) {
  return bookmarks.map((bookmark) => ({
    ...bookmark,
    isSelected: false
  }));
}

export function transformBookmarkFolders(folders: IFolderCard[]) {
  return folders.map((folder) => ({
    ...folder,
    updated_at: timeAgo(folder.updated_at),
    isSelected: false
  }));
}

export function extractPinnedBookmarksData(bookmarks: IBookmarkCard[]) {
  const pinnedBookmarks = ref(bookmarks.filter((bookmark) => bookmark.isPinned));

  const selectedPinnedBookmarks = ref<string[] | null>(null);

  const selectedPinnedBookmarksLength = computed(() => selectedPinnedBookmarks.value?.length || 0);

  return {
    pinnedBookmarks,
    selectedPinnedBookmarks,
    selectedPinnedBookmarksLength
  };
}
