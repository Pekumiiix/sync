<script setup lang="ts">
import { ref } from 'vue';
import { Plus } from 'lucide-vue-next';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { mockFoldersResponse } from '@/mock-data/folders';
import { CreateFolderDialog } from '@/pages/app/shared/dialogs';

import { AppSidebarGroup } from '../components';
import { AppSidebarFooter, UserInfo } from '.';

function getSystemFolderHref(folderId: string) {
  switch (folderId) {
    case 'system_all':
      return 'all-bookmarks';
    case 'system_unsorted':
      return 'unsorted';
    default:
      return '#';
  }
}

const displayCreateFolderDialog = ref(false);
</script>

<template>
  <Sidebar
    collapsible="none"
    class="min-w-66 w-66 h-screen flex flex-col gap-8 py-5 2xl:py-11 px-4 bg-[#F9F9FA] border-r border-stroke-1/10 sticky top-0 left-0"
  >
    <SidebarHeader class="w-full flex flex-row items-center gap-1">
      <img
        src="/images/app/app-logo.png"
        alt="Logo"
        class="size-5.5 shrink-0"
      />
      <p class="text-lg text-black-100 font-instrument-sans font-semibold">SYNC</p>
    </SidebarHeader>

    <SidebarContent class="flex flex-col gap-4">
      <UserInfo />

      <AppSidebarGroup
        label="General"
        :items="
          mockFoldersResponse.systemFolders.map((folder) => ({
            href: getSystemFolderHref(folder.id),
            name: folder.name,
            count: folder.bookmarkCount,
            images: folder.recentBookmarkImages
          }))
        "
      />

      <AppSidebarGroup
        label="Collections"
        :items="
          mockFoldersResponse.collections.map((folder) => ({
            href: folder.id,
            name: folder.name,
            count: folder.bookmarkCount,
            images: folder.recentBookmarkImages
          }))
        "
      />

      <SidebarGroup class="flex flex-col border-t border-[#292D321A] p-0">
        <SidebarGroupContent class="mt-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                @click="displayCreateFolderDialog = true"
                class="h-12.25 flex items-center py-3.5 px-3 gap-1.5 cursor-pointer"
              >
                <Plus
                  :size="20"
                  color="var(--color-black-90)"
                />
                <span class="text-base text-black-90 leading-[100%]">Create folder</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <AppSidebarFooter />
  </Sidebar>

  <CreateFolderDialog v-model="displayCreateFolderDialog" />
</template>
