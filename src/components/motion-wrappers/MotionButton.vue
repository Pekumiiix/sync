<script setup lang="ts">
import { motion, type MotionProps } from 'motion-v';

import { Button } from '../ui/button';

interface Props {
  config?: MotionProps<'button'>;
}

defineProps<Props>();

const MotionButton = motion.create(Button);
</script>

<template>
  <MotionButton v-bind="config">
    <slot />
  </MotionButton>
</template>
