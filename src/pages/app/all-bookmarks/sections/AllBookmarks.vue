<script setup lang="ts">
import { Plus } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';

import { ListBookmarkCard } from '../components';

const bookmarks = [
  {
    id: crypto.randomUUID(),
    platform: 'Facebook',
    link: 'www.facebook.com',
    category: 'unsorted',
    time: '3:30 PM',
    image: '/images/app/sidebar/avatar.png'
  }
];
</script>

<template>
  <section class="flex flex-col gap-5 pt-7">
    <div class="w-full flex items-center justify-between px-6.5">
      <p class="text-lg font-medium text-black-80 leading-[100%]">All Bookmarks</p>

      <Button
        variant="ghost"
        class="flex items-center gap-1 hover:bg-primary-100/10"
      >
        <Plus
          :size="20"
          color="var(--color-primary-100)"
        />
        <span class="text-sm leading-[100%] text-primary-100 underline underline-offset-4"
          >Add bookmark</span
        >
      </Button>
    </div>

    <div class="w-full flex flex-col">
      <ListBookmarkCard
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
