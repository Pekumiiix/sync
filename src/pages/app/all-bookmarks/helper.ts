import { ref } from 'vue';

import type { IBookmarkCard } from '@/types/app.type';

export function transformBookmarks(bookmarks: IBookmarkCard[]) {
  return ref(
    bookmarks.map((bookmark) => ({
      ...bookmark,
      isSelected: false
    }))
  );
}
