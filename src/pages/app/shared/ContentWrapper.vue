<script setup lang="ts">
import { ref } from 'vue';
import { Upload } from 'lucide-vue-next';

import { SearchIcon } from '@/components/icons';
import BaseAvatar from '@/components/re-useable/BaseAvatar.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const query = ref('');
</script>

<template>
  <section
    class="w-full h-fit flex items-center justify-between py-6 px-6.5 border-b border-[#292D321A]"
  >
    <div class="w-67.75 flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8F8F9]">
      <SearchIcon class="size-4" />

      <Input
        v-model="query"
        placeholder="Search all bookmarks"
        class="w-full h-7 text-sm leading-6.5 text-black-100 placeholder:text-black-80 p-0! rounded-none border-none shadow-none"
      />
    </div>

    <div class="flex items-center gap-3">
      <div
        class="w-20 h-9.5 flex items-center justify-center py-3 px-4 -space-x-1.5 rounded-full bg-tertiary-background"
      >
        <BaseAvatar
          v-for="index in 3"
          :key="index"
          src="/images/app/sidebar/avatar.png"
          fallback="PA"
          class="size-6 shrink-0 border-2 border-[#F8F8F9]"
        />
      </div>

      <Button class="w-fit h-9.5 flex items-center gap-2 py-3 px-4 rounded-full">
        <span class="text-xs font-medium">Share</span>
        <Upload
          :size="20"
          class="text-inherit"
        />
      </Button>
    </div>
  </section>

  <slot />
</template>
