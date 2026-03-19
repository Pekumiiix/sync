<script setup lang="ts">
import { X } from 'lucide-vue-next';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  description: string;
  showCloseButton?: boolean;
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

withDefaults(defineProps<Props>(), {
  showCloseButton: false
});

const modelValue = defineModel<boolean>();
</script>

<template>
  <Dialog v-model:open="modelValue">
    <DialogContent
      :class="
        cn(
          'flex flex-col [&>button]:hidden shadow-[0px_4px_215px_0px_#00000026]',
          classNames?.content
        )
      "
    >
      <img
        v-if="img"
        :src="img.src"
        :alt="img.alt"
        :class="img.class"
      />

      <div
        :class="
          cn('h-fit flex items-center', {
            'justify-between p-6 border-b border-black/10': showCloseButton,
            'justify-center': !showCloseButton
          })
        "
      >
        <DialogHeader :class="cn(classNames?.header)">
          <DialogTitle :class="cn(classNames?.title)">{{ title }}</DialogTitle>
          <DialogDescription :class="cn(classNames?.description)">
            {{ description }}
          </DialogDescription>
        </DialogHeader>

        <DialogClose
          v-if="showCloseButton"
          class="cursor-pointer"
        >
          <X
            class="size-5"
            color="var(--color-black-70)"
          />
        </DialogClose>
      </div>

      <slot />
    </DialogContent>
  </Dialog>
</template>
