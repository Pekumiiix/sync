<script setup lang="ts">
import type { Component } from 'vue';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Props {
  items: {
    label: string;
    icon: Component;
    action: () => void;
  }[];
  classNames?: {
    trigger?: string;
    content?: string;
    item?: (label?: string) => string;
    icon?: (label?: string) => string;
    label?: (label?: string) => string;
  };
}

defineProps<Props>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      as-child
      :class="cn('cursor-pointer', classNames?.trigger)"
    >
      <slot />
    </DropdownMenuTrigger>

    <DropdownMenuContent
      :class="cn('border-none shadow-[0px_4px_25px_0px_#0000001A]', classNames?.content)"
    >
      <DropdownMenuItem
        v-for="item in items"
        :key="item.label"
        :class="cn('cursor-pointer', classNames?.item?.(item.label))"
        @click="item.action"
      >
        <component
          :is="item.icon"
          :class="cn(classNames?.icon?.(item.label))"
        />
        <span :class="classNames?.label?.(item.label)">{{ item.label }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
