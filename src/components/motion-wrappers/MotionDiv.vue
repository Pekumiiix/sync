<script setup lang="ts">
import { motion, type MotionProps } from 'motion-v';

interface Props {
  config: MotionProps<'div'>;
}

defineProps<Props>();
</script>

<template>
  <motion.div v-bind="config">
    <slot />
  </motion.div>
</template>
