<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Props {
  classNames?: { popover?: string; trigger?: string; content?: string };
}

defineProps<Props>();
</script>

<template>
  <Popover :class="cn(classNames?.popover)">
    <PopoverTrigger
      as-child
      :class="cn('cursor-pointer', classNames?.trigger)"
    >
      <slot name="trigger" />
    </PopoverTrigger>

    <PopoverContent
      align="end"
      :class="cn('border-none shadow-[0px_4px_70px_0px_#00000026]', classNames?.content)"
    >
      <slot />
    </PopoverContent>
  </Popover>
</template>
