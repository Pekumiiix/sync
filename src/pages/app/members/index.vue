<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { mockFolderMembersResponse } from '@/mock-data/member';

import { AppWrapper } from '../shared';
import { SearchInput } from '../shared/components';
import { MembersItem } from '../shared/components';

const query = ref('');

const route = useRoute();

console.log(route.params.folderId);

const result = computed(() => {
  const searchTerm = query.value.toLowerCase().trim();

  return mockFolderMembersResponse.data.filter((member) => {
    return (
      member.name.toLowerCase().includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm)
    );
  });
});
</script>

<template>
  <AppWrapper>
    <div class="w-full flex items-center justify-between py-6 px-6.5 border-b border-stroke-1/10">
      <div class="flex flex-col gap-1">
        <p class="text-sm leading-6 font-medium text-black-70">
          {{ mockFolderMembersResponse.folder.name }}
        </p>
        <p class="text-xl font-medium leading-7 text-black-90 -tracking-[1%]">
          {{ mockFolderMembersResponse.meta.totalCount }} Members
        </p>
      </div>

      <SearchInput
        v-model="query"
        placeholder="Search Members"
      />
    </div>

    <div v-if="query !== ''">
      <MembersItem
        v-for="member in result"
        :key="member.id"
        :avatar_url="member.avatarUrl"
        :name="member.name"
        :email="member.email"
        :role="member.systemRole"
        :accessLevel="member.accessLevel"
      />
    </div>

    <div v-if="query === ''">
      <MembersItem
        v-for="member in mockFolderMembersResponse.data"
        :key="member.id"
        :avatar_url="member.avatarUrl"
        :name="member.name"
        :email="member.email"
        :role="member.systemRole"
        :accessLevel="member.accessLevel"
      />
    </div>
  </AppWrapper>
</template>
