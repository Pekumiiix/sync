<script setup lang="ts">
import { ref } from 'vue';

import { bookmarks } from '@/mock-data/bookmark';

import { GridBookmarkCard } from '../components';
import { transformBookmarks } from '../helper';

const pinnedBookmarks = ref(bookmarks.filter((bookmark) => bookmark.isPinned));

const transformedBookmarks = transformBookmarks(pinnedBookmarks.value);
</script>

<template>
  <section class="w-full h-fit flex flex-col gap-6 py-8 px-6.5 border-b border-stroke-1/10">
    <p class="text-lg font-medium leading-[100%] text-black-80">Pinned Bookmarks</p>

    <div class="flex flex-row gap-3.5 overflow-x-scroll scrollbar-none">
      <GridBookmarkCard
        v-for="bookmark in transformedBookmarks"
        v-model="bookmark.isSelected"
        :key="bookmark.link"
        :id="bookmark.id"
        :platform="bookmark.platform"
        :link="bookmark.link"
        :collection="bookmark.collection"
        :time="bookmark.time"
        :image="bookmark.image"
        :is-pinned="bookmark.isPinned"
        :tags="bookmark.tags"
        :description="bookmark.description"
      />
    </div>
  </section>
</template>
