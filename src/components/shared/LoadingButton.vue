<script setup lang="ts">
import { computed } from 'vue';
import { LoaderCircle } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  isLoading: boolean;
  disabled?: boolean;
  loaderClass?: string;
  strokeWidth?: number;
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
  <Button
    :disabled="isButtonDisabled"
    v-bind="$attrs"
  >
    <LoaderCircle
      v-if="isLoading"
      :stroke-width="strokeWidth"
      :class="cn('animate-spin shrink-0', props.loaderClass)"
    />

    <slot v-else />
  </Button>
</template>
