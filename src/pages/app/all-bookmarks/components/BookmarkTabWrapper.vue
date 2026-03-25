<script setup lang="ts">
import { computed } from 'vue';

import { EyeIcon, TrashIcon, UnpinIcon } from '@/components/icons';
import { BaseSelect } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import type { DisplayType, SortOrder } from '@/types/app.type';

interface Props {
  defualtValue: string;
  tabs: {
    label: string;
    icon?: string;
    value: string;
  }[];
  selectedBookmarksLength: number;
  allSelectedBookmarksArePinned: boolean;
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
  { value: 'a-z', label: 'A-Z' },
  { value: 'z-a', label: 'Z-A' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' }
];

const actions = computed(() => [
  ...(props.selectedBookmarksLength === 1
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
  ...(props.allSelectedBookmarksArePinned
    ? [
        {
          label: 'Unpin',
          icon: UnpinIcon,
          onClick: () => {
            console.log('Unpinned');
          }
        }
      ]
    : []),

  {
    label: 'Delete',
    icon: TrashIcon,
    onClick: () => {
      console.log('Deleted');
    }
  }
]);

const sortOrder = defineModel<SortOrder>('sortOrder', { default: 'a-z' });
const displayType = defineModel<DisplayType>('displayType', { default: 'list' });
</script>

<template>
  <Tabs
    :default-value="defualtValue"
    class="w-full flex flex-col"
  >
    <div class="w-full flex items-center justify-between py-5 px-6.5 border-b border-stroke-1/10">
      <TabsList class="w-fit h-13.25 flex items-center gap-2 p-2 rounded-full bg-[#F8F8F9]">
        <TabsTrigger
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          :aria-disabled="selectedBookmarksLength > 0"
          :disabled="selectedBookmarksLength > 0"
          class="min-w-20.75 w-fit flex items-center gap-2 py-2 px-3.5 rounded-full text-xs font-medium leading-[100%] text-black-80 font-dm-sans data-[state=active]:font-inter data-[state=active]:text-white data-[state=active]:bg-black-100 hover:bg-primary-10 transition duration-300 cursor-pointer"
        >
          <img
            v-if="tab.icon"
            :src="tab.icon"
            alt="tab.label"
            class="size-4 shrink-0"
          />
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>

      <div
        v-if="selectedBookmarksLength > 0"
        class="flex items-center gap-4"
      >
        <Button
          v-for="action in actions"
          :key="action.label"
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
      </div>

      <div
        v-if="selectedBookmarksLength === 0"
        class="w-fit h-13.25 flex items-center gap-4"
      >
        <BaseSelect
          v-model="sortOrder"
          :options="sortOrderOptions"
          :classNames="{
            trigger: 'w-32 py-4 px-5 rounded-full bg-[#F8F8F9] border-none'
          }"
        />
        <BaseSelect
          v-model="displayType"
          :options="displayTypeOptions"
          :classNames="{
            trigger: 'w-27.5 py-4 px-5 rounded-full bg-[#F8F8F9] border-none'
          }"
        />
      </div>
    </div>

    <slot />

    <TabsContent
      v-for="tab in tabs"
      :key="tab.value"
      :value="tab.value"
      class="w-full flex flex-col gap-0 space-y-0"
    >
      <slot :name="tab.value" />
    </TabsContent>
  </Tabs>
</template>
