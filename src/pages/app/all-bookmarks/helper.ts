import { ref } from 'vue';

import type { IBookmarkCard, IFolderCard } from '@/types/app.type';
import { timeAgo } from '@/utils/dateUtils';

export function transformBookmarks(bookmarks: IBookmarkCard[]) {
  return ref(
    bookmarks.map((bookmark) => ({
      ...bookmark,
      isSelected: false
    }))
  );
}

export function transformFolders(folders: IFolderCard[]) {
  return ref(
    folders.map((folder) => ({
      ...folder,
      updated_at: timeAgo(folder.updated_at),
      isSelected: false
    }))
  );
}
