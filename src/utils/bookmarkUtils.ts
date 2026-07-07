import { computed, type MaybeRefOrGetter, ref, toValue } from 'vue';

import type { IBookmark } from '@/types/bookmark.type';
import type { IFolder, IGetFoldersResponse } from '@/types/folder.type';
import { timeAgo } from '@/utils/dateUtils';

export function transformBookmarks(bookmarks: IBookmark[]) {
  return bookmarks.map((bookmark) => ({
    ...bookmark,
    isSelected: false
  }));
}

export function sumBookmarksCount(folderList: IFolder[] = []) {
  return folderList.reduce((acc, folder) => acc + (folder?.bookmarkCount || 0), 0);
}

export function transformBookmarkFolders(data: IGetFoldersResponse | undefined) {
  return {
    systemFolders: (data?.systemFolders || []).map((folder) => ({
      ...folder,
      updatedAt: timeAgo(folder.updatedAt),
      isSelected: false
    })),
    ownedFolders: (data?.ownedFolders || []).map((folder) => ({
      ...folder,
      updatedAt: timeAgo(folder.updatedAt),
      isSelected: false
    })),
    sharedFolders: (data?.sharedFolders || []).map((folder) => ({
      ...folder,
      updatedAt: timeAgo(folder.updatedAt),
      isSelected: false
    }))
  };
}

export function extractPinnedBookmarksData() {
  const selectedPinnedBookmarks = ref<string[] | null>(null);

  const selectedPinnedBookmarksLength = computed(() => selectedPinnedBookmarks.value?.length || 0);

  return {
    selectedPinnedBookmarks,
    selectedPinnedBookmarksLength
  };
}

export function useTags(
  tagsSource: MaybeRefOrGetter<string[] | undefined>,
  onUpdate: (newTags: string[]) => void
) {
  const currentTag = ref<string>('');

  function addTag() {
    const tag = currentTag.value.trim();

    if (!tag) return;

    const currentTags = toValue(tagsSource) || [];

    if (!currentTags.includes(tag)) {
      onUpdate([...currentTags, tag]);
    }

    currentTag.value = '';
  }

  function removeTag(tagToRemove: string) {
    const currentTags = toValue(tagsSource) || [];
    onUpdate(currentTags.filter((t) => t !== tagToRemove));
  }

  return {
    currentTag,
    addTag,
    removeTag
  };
}

export const FALLBACK_IMAGE = '/images/app/bookmarks/placeholder.png';

export function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement;

  if (target.src !== FALLBACK_IMAGE) {
    target.src = FALLBACK_IMAGE;
    target.onerror = null;
  }
}
