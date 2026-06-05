<script setup lang="ts">
import { staggerContainer } from '../constants/animations';
import { MotionDiv } from '.';
</script>

<template>
  <MotionDiv
    :config="{
      initial: 'initial',
      animate: 'animate',
      exit: 'exit',
      variants: staggerContainer
    }"
  >
    <slot />
  </MotionDiv>
</template>
