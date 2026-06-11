<script setup lang="ts">
import { Check } from 'lucide-vue-next';

import { Button, type ButtonVariants } from '@/components/ui/button';

interface Props {
  isSelected: boolean;
  disabled?: boolean;
  onClick: () => void;
  variant?: ButtonVariants['variant'];
}

withDefaults(defineProps<Props>(), {
  disabled: false
});
</script>

<template>
  <Button
    :disabled="disabled"
    @click="onClick"
    :variant="variant"
    class="w-full h-10.5 flex items-center justify-between gap-2 text-xs font-medium leading-5 py-3 px-4 rounded-full disabled:opacity-90 disabled:cursor-not-allowed"
  >
    <slot />

    <Check
      v-if="isSelected"
      class="text-green-500"
    />
  </Button>
</template>
