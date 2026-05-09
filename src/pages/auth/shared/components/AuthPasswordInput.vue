<script setup lang="ts">
import { BasePasswordInput } from '@/components/re-useable';

interface Props {
  placeholder?: string;
}

defineProps<Props>();
</script>

<template>
  <BasePasswordInput
    :classNames="{
      root: 'py-8.25 px-10.25 rounded-full text-[26px]! border-2 border-[#E5E5E5]',
      input: 'text-[26px]!',
      icon: 'size-7'
    }"
    :placeholder="placeholder"
  />
</template>
