<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';

interface Props {
  title: string;
  description: string;
  isDirty?: boolean;
  isLoading?: boolean;
  onCancel?: () => void;
  onSave?: () => void;
}

defineProps<Props>();
</script>

<template>
  <section class="size-full flex flex-col gap-10">
    <div class="flex items-center justify-between gap-11 pb-7 border-b border-stroke-1/10">
      <div class="flex flex-col gap-1">
        <p class="text-lg font-medium leading-[100%] text-black-90">{{ title }}</p>
        <p class="text-sm leading-4.5 text-black-60">{{ description }}</p>
      </div>

      <div class="flex gap-3.75">
        <Button
          v-if="onCancel"
          @click="onCancel"
          :disabled="!isDirty || isLoading"
          variant="ghost"
          class="w-24 h-9.5 rounded-full py-3 px-4 text-xs font-medium text-black-100 leading-[100%] bg-[#F8F8F9]"
        >
          Cancel
        </Button>
        <Button
          v-if="onSave"
          @click="onSave"
          :disabled="!isDirty || isLoading"
          class="w-24 h-9.5 rounded-full py-3 px-4 text-xs font-medium leading-[100%]"
        >
          <LoaderCircle
            v-if="isLoading"
            class="size-5 stroke-white animate-spin stroke-2"
          />

          <span v-else>Save</span>
        </Button>
      </div>
    </div>

    <slot />
  </section>
</template>
