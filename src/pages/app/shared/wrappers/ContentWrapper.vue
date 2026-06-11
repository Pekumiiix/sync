<script setup lang="ts">
import { computed, ref } from 'vue';
import { Upload } from 'lucide-vue-next';
import { AnimatePresence } from 'motion-v';

import { fadeSlideYConfig, fadeSlideYVariant } from '@/components/constants/animations';
import { MotionParagraph, MotionStaggerContainer } from '@/components/motion-wrappers';
import { MotionDiv } from '@/components/motion-wrappers';
import { BaseAvatar } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { mockBookmarksResponse } from '@/mock-data/bookmarks';
import { transformBookmarks } from '@/utils/bookmarkUtils';

import { ListBookmarkCard, SearchInput } from '../components';
import { ShareFolderDialog } from '../dialogs';

interface Props {
  showTabActions?: boolean;
  folderId?: string;
}

withDefaults(defineProps<Props>(), {
  showTabActions: false
});

const query = ref('');
const showShareDialog = ref(false);

const transformedBookmarks = ref(transformBookmarks(mockBookmarksResponse.data));

const isQueryEmpty = computed(() => query.value === '');

const searchResults = computed(() => {
  if (isQueryEmpty.value) {
    return [];
  }

  return transformedBookmarks.value.filter(
    (bookmark) =>
      bookmark.url.toLowerCase().includes(query.value.toLowerCase()) ||
      bookmark.title.toLowerCase().includes(query.value.toLowerCase()) ||
      bookmark.description?.toLowerCase().includes(query.value.toLowerCase()) ||
      bookmark.tags.some((tag) => tag.toLowerCase().includes(query.value.toLowerCase()))
  );
});
</script>

<template>
  <section
    class="w-full h-fit flex items-center justify-between py-6 px-6.5 border-b border-[#292D321A]"
  >
    <SearchInput
      v-model="query"
      placeholder="Search bookmarks"
    />

    <AnimatePresence>
      <MotionParagraph
        v-if="!isQueryEmpty"
        :config="fadeSlideYConfig"
        class="text-sm text-muted-foreground"
      >
        Showing result for “{{ query }}”
      </MotionParagraph>
    </AnimatePresence>

    <AnimatePresence>
      <MotionStaggerContainer
        v-if="isQueryEmpty && showTabActions && folderId"
        class="flex items-center gap-3"
      >
        <MotionDiv
          :config="{ variants: fadeSlideYVariant }"
          class="size-fit"
        >
          <router-link
            :to="`/app/${folderId}/members`"
            class="w-20 h-9.5 flex items-center justify-center py-3 px-4 -space-x-1.5 rounded-full bg-tertiary-background"
          >
            <BaseAvatar
              v-for="index in 3"
              :key="index"
              src="/images/app/sidebar/avatar.png"
              fallback="PA"
              class="size-6 shrink-0 border-2 border-[#F8F8F9]"
            />
          </router-link>
        </MotionDiv>

        <MotionDiv
          :config="{ variants: fadeSlideYVariant }"
          class="size-fit"
        >
          <Button
            @click="showShareDialog = true"
            class="w-fit h-9.5 flex items-center gap-2 py-3 px-4 rounded-full"
          >
            <span class="text-xs font-medium">Share</span>
            <Upload
              :size="20"
              class="text-inherit"
            />
          </Button>
        </MotionDiv>
      </MotionStaggerContainer>
    </AnimatePresence>
  </section>

  <slot v-if="isQueryEmpty" />

  <div
    v-else
    class="w-full flex flex-col"
  >
    <ListBookmarkCard
      v-for="bookmark in searchResults"
      v-model="bookmark.isSelected"
      :key="bookmark.id"
      :id="bookmark.id"
      :title="bookmark.title"
      :domain="bookmark.domain"
      :url="bookmark.url"
      :folderName="bookmark.folderName"
      :createdAt="bookmark.createdAt"
      :faviconUrl="bookmark.faviconUrl"
      :isPinned="bookmark.isPinned"
      :tags="bookmark.tags"
      :description="bookmark.description"
      :showCheckbox="false"
    />
  </div>

  <ShareFolderDialog v-model="showShareDialog" />
</template>
