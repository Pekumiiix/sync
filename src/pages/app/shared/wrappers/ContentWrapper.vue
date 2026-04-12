<script setup lang="ts">
import { ref } from 'vue';
import { Upload } from 'lucide-vue-next';

import BaseAvatar from '@/components/re-useable/BaseAvatar.vue';
import { Button } from '@/components/ui/button';

import { SearchInput } from '../components';

interface Props {
  showTabActions?: boolean;
  folderId?: string;
}

withDefaults(defineProps<Props>(), {
  showTabActions: false
});

const query = ref('');
</script>

<template>
  <section
    class="w-full h-fit flex items-center justify-between py-6 px-6.5 border-b border-[#292D321A]"
  >
    <SearchInput
      v-model="query"
      placeholder="Search bookmarks"
    />

    <p
      v-if="query !== ''"
      class="text-lg font-medium leading-[100%] text-black-70"
    >
      Showing result for “{{ query }}”
    </p>

    <div
      v-else-if="showTabActions && folderId"
      class="flex items-center gap-3"
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
