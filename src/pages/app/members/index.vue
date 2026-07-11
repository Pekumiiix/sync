<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useGetFolderMembers } from '@/hooks/useMember';

import { AppWrapper } from '../shared';
import { SearchInput } from '../shared/components';
import { MembersItem } from '../shared/components';

const query = ref('');

const route = useRoute();

const { data: folderMembersData } = useGetFolderMembers(() => ({
  folderId: route.params.folderId as string
}));

const result = computed(() => {
  const searchTerm = query.value.toLowerCase().trim();

  return folderMembersData?.value?.data.members.filter((member) => {
    return (
      member.user.firstName.toLowerCase().includes(searchTerm) ||
      member.user.lastName.toLowerCase().includes(searchTerm) ||
      member.user.email.toLowerCase().includes(searchTerm)
    );
  });
});
</script>

<template>
  <AppWrapper>
    <div class="w-full flex items-center justify-between py-6 px-6.5 border-b border-stroke-1/10">
      <div class="flex flex-col gap-1">
        <p class="text-sm leading-6 font-medium text-black-70">
          {{ folderMembersData?.data.folder.name }}
        </p>
        <p class="text-xl font-medium leading-7 text-black-90 -tracking-[1%]">
          {{ folderMembersData?.data.meta.totalMemberCount }} Members
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
        :memberId="member.id"
        :folderId="member.folderId"
        :avatar_url="member.user.avatarUrl"
        :name="member.user.firstName + ' ' + member.user.lastName"
        :email="member.user.email"
        :role="member.role"
        :accessLevel="member.accessLevel"
      />
    </div>

    <div v-if="query === ''">
      <MembersItem
        v-for="member in folderMembersData?.data.members || []"
        :key="member.id"
        :memberId="member.id"
        :folderId="member.folderId"
        :avatar_url="member.user.avatarUrl"
        :name="member.user.firstName + ' ' + member.user.lastName"
        :email="member.user.email"
        :role="member.role"
        :accessLevel="member.accessLevel"
      />
    </div>
  </AppWrapper>
</template>
