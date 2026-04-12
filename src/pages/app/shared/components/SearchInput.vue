<script setup lang="ts">
import { SearchIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';

interface Props {
  placeholder: string;
}

defineProps<Props>();

const query = defineModel<string>('');
</script>

<template>
  <div class="w-67.75 flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8F8F9]">
    <SearchIcon class="size-4" />

    <Input
      v-model="query"
      :placeholder="placeholder"
      class="w-full h-7 text-sm leading-6.5 text-black-100 placeholder:text-black-80 p-0! rounded-none border-none shadow-none"
    />
  </div>
</template>
