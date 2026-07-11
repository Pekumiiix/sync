<script setup lang="ts">
import { computed } from 'vue';
import { LoaderCircle } from 'lucide-vue-next';
import type { MotionProps } from 'motion-v';

import { type ButtonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { MotionButton } from '../motion-wrappers';

interface Props {
  isLoading: boolean;
  disabled?: boolean;
  loaderClass?: string;
  strokeWidth?: number;
  variant?: ButtonVariants['variant'];
  config?: MotionProps<'button'>;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  disabled: false,
  strokeWidth: 2,
  loaderClass: 'size-7'
});

const isButtonDisabled = computed(() => props.isLoading || props.disabled);
</script>

<template>
  <MotionButton
    v-bind="$attrs"
    :config="config"
    :disabled="isButtonDisabled"
    :variant="props.variant"
  >
    <LoaderCircle
      v-if="isLoading"
      :stroke-width="strokeWidth"
      :class="cn('animate-spin shrink-0', props.loaderClass)"
    />

    <slot v-else />
  </MotionButton>
</template>
