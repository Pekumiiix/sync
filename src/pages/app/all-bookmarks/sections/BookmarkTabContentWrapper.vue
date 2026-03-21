<script setup lang="ts">
import { ref } from 'vue';
import { Plus } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import type { DisplayType, IBookmarkCard } from '@/types/app.type';

import { AddBookmarkDialog } from '../../shared/add-bookmark-dialog/dialogs';
import { GridBookmarkCard, ListBookmarkCard } from '../components';
import { transformBookmarks } from '../helper';

interface Props {
  displayType: DisplayType;
  bookmarks: IBookmarkCard[];
  platform: string;
}

const props = defineProps<Props>();

const open = ref(false);

const transformedBookmarks = transformBookmarks(props.bookmarks);
</script>

<template>
  <section class="flex flex-col gap-5 pt-7">
    <div class="w-full flex items-center justify-between px-6.5">
      <p class="text-lg font-medium text-black-80 leading-[100%]">{{ platform }} Bookmarks</p>

      <Button
        @click="open = true"
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

    <div
      v-if="displayType === 'list'"
      class="flex flex-col"
    >
      <ListBookmarkCard
        v-for="bookmark in transformedBookmarks"
        v-model="bookmark.isSelected"
        :key="bookmark.id"
        :id="bookmark.id"
        :platform="bookmark.platform"
        :link="bookmark.link"
        :collection="bookmark.collection"
        :time="bookmark.time"
        :image="bookmark.image"
        :isPinned="bookmark.isPinned"
        :tags="bookmark.tags"
        :description="bookmark.description"
      />
    </div>

    <div
      v-else
      class="flex flex-row flex-wrap gap-3.5 px-6.5 pb-5"
    >
      <GridBookmarkCard
        v-for="bookmark in transformedBookmarks"
        v-model="bookmark.isSelected"
        :key="bookmark.id"
        :id="bookmark.id"
        :platform="bookmark.platform"
        :link="bookmark.link"
        :collection="bookmark.collection"
        :time="bookmark.time"
        :image="bookmark.image"
        :isPinned="bookmark.isPinned"
        :tags="bookmark.tags"
        :description="bookmark.description"
      />
    </div>
  </section>

  <AddBookmarkDialog v-model="open" />
</template>
