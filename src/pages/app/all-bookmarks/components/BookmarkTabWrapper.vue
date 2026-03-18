<script setup lang="ts">
import { BaseSelect } from '@/components/re-useable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { DisplayType, SortOrder } from '@/types/app.type';

interface Props {
  defualtValue: string;
  tabs: {
    label: string;
    icon?: string;
    value: string;
  }[];
}

defineProps<Props>();

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

      <div class="w-fit h-13.25 flex items-center gap-4">
        <BaseSelect
          v-model="sortOrder"
          :options="sortOrderOptions"
          :classNames="{
            trigger: 'w-32 py-4 px-5 rounded-full bg-[#F8F8F9]'
          }"
        />
        <BaseSelect
          v-model="displayType"
          :options="displayTypeOptions"
          :classNames="{
            trigger: 'w-27.5 py-4 px-5 rounded-full bg-[#F8F8F9]'
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
