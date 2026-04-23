<script setup lang="ts">
import { BaseDialog } from '@/components/re-useable';

interface Props {
  title: string;
  description: string;
  showDescription?: boolean;
  contentClass?: string;
}

withDefaults(defineProps<Props>(), {
  showDescription: true
});

const displayBool = defineModel<boolean>({ default: false });
</script>

<template>
  <BaseDialog
    v-model="displayBool"
    showCloseButton
    :title="title"
    :description="description"
    :classNames="{
      content: `gap-0 rounded-[25px] border border-stroke-1/20 p-0 overflow-hidden overflow-y-auto scrollbar-none ${contentClass}`,
      header: 'flex flex-col gap-1',
      title: 'text-xl font-medium leading-7 text-black-90 -tracking-[1%]',
      description: `text-base text-black-60 leading-[100%] ${showDescription ? 'block' : 'sr-only'}`
    }"
  >
    <slot />
  </BaseDialog>
</template>
