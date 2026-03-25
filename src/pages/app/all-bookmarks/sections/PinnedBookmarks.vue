<script setup lang="ts">
import type { ITransformedBookmark } from '@/types/app.type';

import { GridBookmarkCard } from '../components';

interface Props {
  selectedBookmarksLength: number;
  pinnedBookmarks: ITransformedBookmark[];
}

defineProps<Props>();
</script>

<template>
  <section class="w-full h-fit flex flex-col gap-6 py-8 px-6.5 border-b border-stroke-1/10">
    <p class="text-lg font-medium leading-[100%] text-black-80">Pinned Bookmarks</p>

    <div class="flex flex-row gap-3.5 overflow-x-scroll scrollbar-none">
      <GridBookmarkCard
        v-for="bookmark in pinnedBookmarks"
        v-model="bookmark.isSelected"
        :key="bookmark.id"
        :bookmark="bookmark"
        :showCheckbox="selectedBookmarksLength > 0"
      />
    </div>
  </section>
</template>
