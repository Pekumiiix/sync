<script setup lang="ts">
import { useRouter } from 'vue-router';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface Props {
  label: string;
  items: { path: string; name: string; count: number }[];
}

defineProps<Props>();

const router = useRouter();
</script>

<template>
  <SidebarGroup class="flex flex-col gap-3 p-0">
    <SidebarGroupLabel class="text-sm font-normal leading-4.5 text-black-60">{{
      label
    }}</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu class="flex flex-col gap-0.5">
        <SidebarMenuItem
          v-for="item in items"
          :key="item.path"
        >
          <SidebarMenuButton
            as-child
            :class="
              cn('flex items-center justify-between py-3.5 px-3', {
                'bg-white': router.currentRoute.value.path === item.path,
                'bg-transparent': router.currentRoute.value.path !== item.path
              })
            "
          >
            <router-link :to="item.path">
              <span class="text-base leading-[100%] text-black-90">{{ item.name }}</span>
              <span class="text-base leading-[100%] text-black-90">{{ item.count }}</span>
            </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
