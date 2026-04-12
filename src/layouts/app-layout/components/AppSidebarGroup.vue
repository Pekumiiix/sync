<script setup lang="ts">
import { useRouter } from 'vue-router';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import FolderThumbnail from '@/pages/app/shared/FolderThumbnail.vue';

interface Props {
  label: string;
  items: { path: string; name: string; count: number; images?: string[] }[];
}

defineProps<Props>();

const router = useRouter();
</script>

<template>
  <SidebarGroup class="flex flex-col gap-3 p-0">
    <SidebarGroupLabel class="text-sm font-normal leading-4.5 text-black-60">
      {{ label }}
    </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu class="flex flex-col gap-0.5">
        <SidebarMenuItem
          v-for="item in items"
          :key="item.path"
        >
          <SidebarMenuButton
            as-child
            :class="
              cn('h-12.25 flex items-center justify-between py-3.5 px-3', {
                'bg-white hover:bg-white': router.currentRoute.value.path === item.path,
                'bg-transparent': router.currentRoute.value.path !== item.path
              })
            "
          >
            <router-link :to="item.path">
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
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
