<script setup lang="ts">
import { motion, type MotionProps } from 'motion-v';

interface Props {
  config: MotionProps<'p'>;
}

defineProps<Props>();
</script>

<template>
  <motion.p v-bind="config">
    <slot />
  </motion.p>
</template>
