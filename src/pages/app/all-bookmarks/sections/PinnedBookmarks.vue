<script setup lang="ts">
import { ref, watch } from 'vue';

import { bookmarks } from '@/mock-data/bookmark';

import { GridBookmarkCard } from '../components';
import { transformBookmarks } from '../helper';

interface Props {
  selectedPinnedBookmarksLength: number;
}

defineProps<Props>();

const pinnedBookmarks = ref(bookmarks.filter((bookmark) => bookmark.isPinned));
const transformedBookmarks = ref(transformBookmarks(pinnedBookmarks.value));

const selectedPinnedBookmarks = defineModel<string[] | null>({ default: null });

watch(
  transformedBookmarks,

  (newBookmarks) => {
    const selected = newBookmarks.filter((bookmark) => bookmark.isSelected);

    selectedPinnedBookmarks.value = selected.length > 0 ? selected.map((b) => b.id) : null;
  },

  { deep: true, immediate: true }
);
</script>

<template>
  <section class="w-full h-fit flex flex-col gap-6 py-8 px-6.5 border-b border-stroke-1/10">
    <p class="text-lg font-medium leading-[100%] text-black-80">Pinned Bookmarks</p>

    <div class="flex flex-row gap-3.5 overflow-x-scroll scrollbar-none">
      <GridBookmarkCard
        v-for="bookmark in transformedBookmarks"
        v-model="bookmark.isSelected"
        :key="bookmark.id"
        :bookmark="bookmark"
        :showCheckbox="selectedPinnedBookmarksLength > 0"
      />
    </div>
  </section>
</template>
