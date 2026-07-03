<script setup lang="ts">
import { ref, watch } from 'vue';
import { Plus } from 'lucide-vue-next';
import { AnimatePresence } from 'motion-v';

import { fadeSlideYConfig, fadeSlideYVariant } from '@/components/constants/animations';
import { EyeIcon, FolderIcon, TrashIcon } from '@/components/icons';
import { MotionDiv, MotionStaggerContainer } from '@/components/motion-wrappers';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { DisplayType } from '@/types/app.type';
import type { IBookmark } from '@/types/bookmark.type';
import { transformBookmarks } from '@/utils/bookmarkUtils';

import { GridBookmarkCard, ListBookmarkCard } from '../components';
import { AddBookmarkDialog, DeleteBookmarkDialog, MoveBookmarkDialog } from '../dialogs';

interface Props {
  displayType: DisplayType;
  bookmarks: IBookmark[];
  platform: string;
}

const props = defineProps<Props>();

const addBookmarkDisplayBool = ref(false);
const moveBookmarkDisplayBool = ref(false);
const deleteBookmarkDisplayBool = ref(false);

const transformedBookmarks = ref(transformBookmarks(props.bookmarks));

const actions = [
  {
    label: 'View',
    icon: EyeIcon,
    acion: () => {}
  },
  {
    label: 'Move',
    icon: FolderIcon,
    acion: () => {
      moveBookmarkDisplayBool.value = true;
    }
  },
  {
    label: 'Delete',
    icon: TrashIcon,
    acion: () => {
      deleteBookmarkDisplayBool.value = true;
    },
    class: 'text-[#FF2F00] stroke-[#FF2F00] hover:text-[#FF2F00] hover:bg-[#FF2F00]/10'
  }
];

const selectedBookmarks = ref<string[]>([]);

watch(
  transformedBookmarks,

  (newBookmarks) => {
    const selected = newBookmarks.filter((bookmark) => bookmark.isSelected);

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
            v-for="action in actions"
            :key="action.label"
            :config="{ variants: fadeSlideYVariant }"
            class="size-fit"
          >
            <Button
              variant="ghost"
              @click="action.acion"
              :class="
                cn('flex items-center gap-1 text-base leading-[100%] text-black-90', action.class)
              "
            >
              <component :is="action.icon" /> <span>{{ action.label }}</span>
            </Button>
          </MotionDiv>
        </MotionStaggerContainer>
      </AnimatePresence>

      <!-------------------------------------- Add bookmark buttons --------------------------------->
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
        :showCheckbox="(selectedBookmarks?.length || 0) > 0"
      />
    </div>
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
