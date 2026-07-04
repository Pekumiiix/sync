<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence } from 'motion-v';

import { fadeSlideYVariant } from '@/components/constants/animations';
import { getBrowserImage } from '@/components/constants/browsers';
import { EyeIcon, TrashIcon, UnpinIcon } from '@/components/icons';
import { MotionDiv, MotionStaggerContainer } from '@/components/motion-wrappers';
import { BaseSelect } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import type { BrowserProvider, DisplayType, SortOrder } from '@/types/app.type';
import type { IBookmark } from '@/types/bookmark.type';

import { DeleteBookmarkDialog } from '../dialogs';
import { BookmarkTabContentWrapper } from '.';

interface Props {
  bookmarks: IBookmark[];
  selectedPinnedBookmarksLength: number;
  tabs: { label: string; value: BrowserProvider | 'all' }[];
}

const props = defineProps<Props>();

interface IDisplayTypeOptions {
  value: DisplayType;
  label: string;
}

interface ISortOrderOptions {
  value: SortOrder;
  label: string;
}

const displayTypeOptions: IDisplayTypeOptions[] = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' }
];

const sortOrderOptions: ISortOrderOptions[] = [
  { value: 'title_desc', label: 'A-Z' },
  { value: 'title_asc', label: 'Z-A' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' }
];

const displayType = ref<DisplayType>('list');

const showDeleteBookmarkDialog = ref<boolean>(false);

const isSelectedPinnedBookmarksGreaterThanZero = computed(
  () => props.selectedPinnedBookmarksLength > 0
);

const actions = computed(() => [
  ...(props.selectedPinnedBookmarksLength === 1
    ? [
        {
          label: 'View',
          icon: EyeIcon,
          onClick: () => {
            console.log('Viewed');
          }
        }
      ]
    : []),
  {
    label: 'Unpin',
    icon: UnpinIcon,
    onClick: () => {
      console.log('Unpinned');
    }
  },
  {
    label: 'Delete',
    icon: TrashIcon,
    onClick: () => {
      showDeleteBookmarkDialog.value = true;
    }
  }
]);

const activeTab = defineModel<string>('activeTab', { default: 'all' });
const sortOrder = defineModel<SortOrder>('sortOrder', { default: 'title_desc' });
const selectedPinnedBookmarks = defineModel<string[] | null>('selectedPinnedBookmarks', {
  default: null
});
</script>

<template>
  <Tabs
    v-model="activeTab"
    class="w-full flex flex-col"
  >
    <div class="w-full flex items-center justify-between py-5 px-6.5 border-b border-stroke-1/10">
      <TabsList class="w-fit h-13.25 flex items-center gap-2 p-2 rounded-full bg-[#F8F8F9]">
        <!-------------------------------------- Tab Trigger --------------------------------------->
        <TabsTrigger
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          :aria-disabled="isSelectedPinnedBookmarksGreaterThanZero"
          :disabled="isSelectedPinnedBookmarksGreaterThanZero"
          class="min-w-20.75 w-fit flex items-center gap-2 py-2 px-3.5 rounded-full text-xs font-medium leading-[100%] capitalize text-black-80 font-dm-sans data-[state=active]:font-inter data-[state=active]:text-white data-[state=active]:bg-black-100 hover:bg-primary-10 transition duration-300 cursor-pointer"
        >
          <img
            v-if="getBrowserImage(tab.value)"
            :src="getBrowserImage(tab.value)"
            :alt="tab.label"
            class="size-4 shrink-0"
          />
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>

      <!-------------------------------------- Action Buttons --------------------------------------->
      <AnimatePresence>
        <MotionStaggerContainer
          v-if="isSelectedPinnedBookmarksGreaterThanZero"
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
              :class="
                cn('w-27 h-13.2 flex items-center gap-2 py-4 px-5 rounded-full bg-[#F8F8F9]', {
                  'bg-[#FF2F000A] stroke-[#FF2F00] text-[#FF2F00] hover:text-[#ff2f00] hover:bg-[#FF2F00]/10':
                    action.label === 'Delete',
                  'text-black-90 stroke-black-90': action.label !== 'Delete'
                })
              "
              @click="action.onClick"
            >
              <component
                :is="action.icon"
                class="size-4 stroke-inherit"
              />
              <span class="text-inherit leading-[100%] text-base">{{ action.label }}</span>
            </Button>
          </MotionDiv>
        </MotionStaggerContainer>
      </AnimatePresence>

      <!-------------------------------------- Display and Filter selects --------------------------------------->
      <AnimatePresence>
        <MotionStaggerContainer
          v-if="!isSelectedPinnedBookmarksGreaterThanZero"
          class="w-fit h-13.25 flex items-center gap-4"
        >
          <MotionDiv
            :config="{ variants: fadeSlideYVariant }"
            class="size-fit"
          >
            <BaseSelect
              v-model="sortOrder"
              :options="sortOrderOptions"
              :classNames="{
                trigger: 'w-32 min-h-13.25 h-13.25 py-4 px-5 rounded-full bg-[#F8F8F9] border-none'
              }"
            />
          </MotionDiv>
          <MotionDiv
            :config="{ variants: fadeSlideYVariant }"
            class="size-fit"
          >
            <BaseSelect
              v-model="displayType"
              :options="displayTypeOptions"
              :classNames="{
                trigger:
                  'w-27.5 min-h-13.25 h-13.25 py-4 px-5 rounded-full bg-[#F8F8F9] border-none'
              }"
            />
          </MotionDiv>
        </MotionStaggerContainer>
      </AnimatePresence>
    </div>

    <slot />

    <TabsContent
      v-for="tab in tabs"
      :key="tab.value"
      :value="tab.value"
      class="w-full flex flex-col gap-0 space-y-0"
    >
      <BookmarkTabContentWrapper
        :platform="tab.label"
        :displayType="displayType"
        :bookmarks="bookmarks"
      />
    </TabsContent>
  </Tabs>

  <DeleteBookmarkDialog
    v-if="selectedPinnedBookmarks && selectedPinnedBookmarks.length > 0"
    v-model="showDeleteBookmarkDialog"
    :bookmark-ids="selectedPinnedBookmarks"
  />
</template>
