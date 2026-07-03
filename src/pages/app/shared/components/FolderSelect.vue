<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { timeAgo } from '@/utils/dateUtils';

import { FolderThumbnail } from '.';

interface Options {
  id: string;
  name: string;
  updatedAt: string;
  bookmarkCount: number;
  recentImages: string[];
}

interface Props {
  groups: {
    label: string;
    options?: Options[];
  }[];
}

const props = defineProps<Props>();

const modelValue = defineModel<string>();

function renderValue(value: string) {
  const val =
    props.groups.flatMap((g) => g.options || []).find((opt) => opt.id === value)?.name || value;

  return val.charAt(0).toLocaleUpperCase() + val?.slice(1) || 'Select a folder';
}
</script>

<template>
  <Select
    v-model="modelValue"
    class="w-full"
  >
    <SelectTrigger
      class="w-full h-12.25! text-base leading-[100%] text-black-90 placeholder:text-black-60 py-3.5 px-4.5 rounded-full cursor-pointer border border-[#E8E8E8] shadow-none group-hover:border-primary-90/70 transition-colors duration-200 focus-visible:border-primary-90/70 ring-0"
    >
      <SelectValue placeholder="Select a folder">
        {{ renderValue(modelValue || '') }}
      </SelectValue>
    </SelectTrigger>
    <SelectContent
      class="w-full flex flex-col gap-2 border-none! shadow-[0px_4px_25px_0px_#0000001A] rounded-2xl"
    >
      <template
        v-for="group in props.groups"
        :key="group.label"
      >
        <SelectGroup
          v-if="group.options && group.options.length > 0"
          class="flex flex-col"
        >
          <SelectLabel>{{ group.label }}</SelectLabel>
          <SelectItem
            v-for="option in group.options"
            :key="option.id"
            :value="option.id"
            class="w-full flex items-center justify-between gap-2 py-3.5 px-4.5 rounded-2xl bg-transparent cursor-pointer hover:bg-black/5"
          >
            <FolderThumbnail
              :folderName="option.name"
              :images="option.recentImages"
              :class-names="{
                container: 'size-9 px-0.5 py-1 gap-0.75 shrink-0 rounded-[6px]',
                images: {
                  top: 'w-3.5 rounded-[4px]',
                  bottom: 'w-full h-3.25 rounded-[4px] mt-0.5'
                }
              }"
            />

            <div class="flex flex-col">
              <span class="text-base font-medium leading-5.5 text-black-80 -tracking-[1%]">
                {{ option.name }}
              </span>
              <span class="text-xs text-black-50 leading-[100%]">
                Updated {{ timeAgo(option.updatedAt) }} ago | {{ option.bookmarkCount }} item(s)
              </span>
            </div>
          </SelectItem>
        </SelectGroup>
      </template>
    </SelectContent>
  </Select>
</template>
