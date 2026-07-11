<script setup lang="ts">
import { ref, watch } from 'vue';
import { computed } from 'vue';
import { Plus } from 'lucide-vue-next';
import { AnimatePresence } from 'motion-v';

import { fadeSlideYConfig, fadeSlideYVariant } from '@/components/constants/animations';
import { FolderIcon, TrashIcon } from '@/components/icons';
import { MotionDiv, MotionStaggerContainer } from '@/components/motion-wrappers';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { DisplayType } from '@/types/app.type';
import type { IBookmark } from '@/types/bookmark.type';
import { transformBookmarks } from '@/utils/bookmarkUtils';

import { GridBookmarkCard, ListBookmarkCard } from '../components';
import { AddBookmarkDialog, DeleteBookmarkDialog, MoveBookmarkDialog } from '../dialogs';
import { EmptyState } from '../query-states';
import { QueryStateWrapper } from '.';

interface Props {
  displayType: DisplayType;
  bookmarks: IBookmark[];
  platform: string;
}

const props = defineProps<Props>();

const addBookmarkDisplayBool = ref(false);
const moveBookmarkDisplayBool = ref(false);
const deleteBookmarkDisplayBool = ref(false);

const selectedBookmarks = ref<string[]>([]);

const transformedBookmarks = ref(transformBookmarks(props.bookmarks));

const buttons = computed(() => [
  {
    label: 'Move',
    icon: FolderIcon,
    action: () => {
      moveBookmarkDisplayBool.value = true;
    }
  },
  {
    label: 'Delete',
    icon: TrashIcon,
    action: () => {
      deleteBookmarkDisplayBool.value = true;
    },
    class: 'text-[#FF2F00] stroke-[#FF2F00] hover:text-[#FF2F00] hover:bg-[#FF2F00]/10'
  }
]);

watch(
  [() => props.bookmarks, transformedBookmarks],
  ([newBookmarksFromProps, newTransformedBookmarks], [oldBookmarksFromProps]) => {
    if (newBookmarksFromProps !== oldBookmarksFromProps) {
      transformedBookmarks.value = transformBookmarks(newBookmarksFromProps);
      return;
    }

    const selected = newTransformedBookmarks.filter((bookmark) => bookmark.isSelected);

    selectedBookmarks.value = selected.length > 0 ? selected.map((b) => b.id) : [];
  },

  { deep: true, immediate: true }
);
</script>

<template>
  <section class="flex flex-col gap-5 pt-7">
    <div class="w-full flex items-center justify-between px-6.5">
      <p class="text-lg font-medium text-black-80 leading-[100%] capitalize">
        {{ platform }} bookmarks
      </p>

      <!-------------------------------------- Action buttons --------------------------------->
      <AnimatePresence>
        <MotionStaggerContainer
          v-if="selectedBookmarks?.length > 0"
          class="flex items-center gap-4"
        >
          <MotionDiv
            v-for="button in buttons"
            :key="button.label"
            :config="{ variants: fadeSlideYVariant }"
            class="size-fit"
          >
            <Button
              variant="ghost"
              @click="button.action"
              :class="
                cn('flex items-center gap-1 text-base leading-[100%] text-black-90', button.class)
              "
            >
              <component :is="button.icon" /> <span>{{ button.label }}</span>
            </Button>
          </MotionDiv>
        </MotionStaggerContainer>
      </AnimatePresence>

      <!-------------------------------------- Add bookmark button --------------------------------->
      <AnimatePresence>
        <MotionDiv
          v-if="selectedBookmarks.length === 0"
          :config="fadeSlideYConfig"
          class="size-fit"
        >
          <Button
            @click="addBookmarkDisplayBool = true"
            variant="ghost"
            class="flex items-center gap-1 hover:bg-primary-100/10"
          >
            <Plus
              :size="20"
              color="var(--color-primary-100)"
            />
            <span class="text-sm leading-[100%] text-primary-100 underline underline-offset-4">
              Add bookmark
            </span>
          </Button>
        </MotionDiv>
      </AnimatePresence>
    </div>

    <!------------------------- Bookmark Cards --------------------------->
    <QueryStateWrapper :is-empty="!bookmarks.length">
      <template #default>
        <div
          v-if="displayType === 'list'"
          class="flex flex-col"
        >
          <ListBookmarkCard
            v-for="bookmark in transformedBookmarks"
            v-model="bookmark.isSelected"
            :key="bookmark.id"
            :bookmark="bookmark"
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
            :bookmark="bookmark"
            :showCheckbox="!!selectedBookmarks?.length"
          />
        </div>
      </template>

      <template #empty>
        <div class="w-full h-fit px-6.5 pb-7">
          <EmptyState
            class="rounded-[12px] border border-white-90"
            title="You have no bookmarks at this moment"
          >
            <router-link
              to="#"
              class="text-sm leading-4 font-medium font-dm-sans underline text-black-100 underline-offset-2"
            >
              Sync from another browser?
            </router-link>
          </EmptyState>
        </div>
      </template>
    </QueryStateWrapper>
  </section>

  <!------------------------------------ Dialogs --------------------------------------------->
  <DeleteBookmarkDialog
    v-if="selectedBookmarks && selectedBookmarks.length > 0"
    :bookmarkIds="selectedBookmarks"
    v-model="deleteBookmarkDisplayBool"
  />

  <AddBookmarkDialog v-model="addBookmarkDisplayBool" />

  <MoveBookmarkDialog
    v-if="selectedBookmarks && selectedBookmarks.length > 0"
    :bookmarkIds="selectedBookmarks"
    v-model="moveBookmarkDisplayBool"
  />
</template>
