<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classNames?: {
    content?: string;
    header?: string;
    title?: string;
    description?: string;
  };
  img?: {
    src?: string;
    alt?: string;
    class?: string;
  };
}

defineProps<Props>();
</script>

<template>
  <Dialog
    :open="open"
    @update:open="onOpenChange"
  >
    <DialogContent :class="cn(classNames?.content)">
      <img
        v-if="img"
        :src="img.src"
        :alt="img.alt"
        :class="img.class"
      />

      <DialogHeader :class="cn(classNames?.header)">
        <DialogTitle :class="cn(classNames?.title)">{{ title }}</DialogTitle>
        <DialogDescription :class="cn(classNames?.description)">
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <slot />
    </DialogContent>
  </Dialog>
</template>
