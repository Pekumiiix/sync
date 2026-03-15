<script setup lang="ts">
import { GridBookmarkCard } from '../components';

const bookmarks = [
  {
    id: crypto.randomUUID(),
    platform: 'Facebook',
    link: 'www.facebook.com',
    category: 'unsorted',
    time: '3:30 PM',
    image: '/images/app/bookmarks/image.png'
  }
];
</script>

<template>
  <section class="w-full h-fit flex flex-col gap-6 py-8 px-6.5 border-b border-[#292D321A]">
    <p class="text-lg font-medium leading-[100%] text-black-80">Pinned Bookmarks</p>

    <div class="flex gap-3.5 overflow-auto scrollbar-none">
      <GridBookmarkCard
        v-for="bookmark in bookmarks"
        :key="bookmark.link"
        :id="bookmark.id"
        :platform="bookmark.platform"
        :link="bookmark.link"
        :category="bookmark.category"
        :time="bookmark.time"
        :image="bookmark.image"
      />
    </div>
  </section>
</template>
