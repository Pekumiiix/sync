<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { AppWrapper } from '../shared';
import { SearchInput } from '../shared/components';
import { MemberItem } from './components';

const query = ref('');

const route = useRoute();

console.log(route.params.folderId);
</script>

<template>
  <AppWrapper>
    <div class="w-full flex items-center justify-between py-6 px-6.5 border-b border-stroke-1/10">
      <div class="flex flex-col gap-1">
        <p class="text-sm leading-6 font-medium text-black-70">Unsorted</p>
        <p class="text-xl font-medium leading-7 text-black-90 -tracking-[1%]">19 Members</p>
      </div>

      <SearchInput
        v-model="query"
        placeholder="Search Members"
      />
    </div>

    <MemberItem
      avatar_url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      name="Pelumi Amao"
      email="pelumi@amao.com"
      role="admin"
    />

    <MemberItem
      avatar_url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      name="Pelumi Amao"
      email="pelumi@amao.com"
      role="admin"
    />
  </AppWrapper>
</template>
