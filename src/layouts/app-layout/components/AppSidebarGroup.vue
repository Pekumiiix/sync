<script setup lang="ts">
import { useRoute } from 'vue-router';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { FolderThumbnail } from '@/pages/app/shared/components';
import { QueryStateWrapper } from '@/pages/app/shared/wrappers';

interface Props {
  label: string;
  items?: { href: string; name: string; count: number; images?: string[] }[];
  isLoading: boolean;
  isEmpty: boolean;
}

defineProps<Props>();

const route = useRoute();

const isItemActive = (itemHref: string) => {
  if (itemHref === 'all-bookmarks') {
    return route.name === 'All Bookmarks';
  }

  return route.params.folderId === itemHref;
};
</script>

<template>
  <SidebarGroup
    v-if="!isEmpty"
    class="h-fit flex flex-col gap-0 p-0"
  >
    <SidebarGroupLabel class="text-sm font-normal leading-4.5 text-black-60">
      {{ label }}
    </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu class="flex flex-col gap-1">
        <QueryStateWrapper :is-loading="isLoading">
          <template #default>
            <SidebarMenuItem
              v-for="item in items"
              :key="item.href"
            >
              <SidebarMenuButton
                as-child
                :class="
                  cn(
                    'h-12.25 flex items-center justify-between py-3.5 px-3 transition-colors duration-200',
                    {
                      'bg-white hover:bg-white': isItemActive(item.href),
                      'bg-transparent hover:bg-black/5': !isItemActive(item.href)
                    }
                  )
                "
              >
                <router-link :to="`/app/${item.href}`">
                  <div class="flex items-center gap-1.5">
                    <FolderThumbnail
                      :images="item.images"
                      :class-names="{
                        container: 'size-5 rounded-[4px] p-0.5',
                        images: {
                          top: 'rounded-[2px]',
                          bottom: 'h-2 rounded-[2px]'
                        }
                      }"
                    />

                    <span class="text-base leading-[100%] text-black-90">{{ item.name }}</span>
                  </div>
                  <span class="text-base leading-[100%] text-black-90">{{ item.count }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </template>

          <template #loading>
            <Skeleton class="h-12.25" />
          </template>
        </QueryStateWrapper>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
