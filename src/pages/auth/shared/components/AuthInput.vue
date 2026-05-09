<script setup lang="ts">
import { Input } from '@/components/ui/input';

interface Props {
  placeholder: string;
}

defineProps<Props>();
</script>

<template>
  <Input
    class="py-8.25 px-10.25 rounded-full text-[26px]! border-2 border-[#E5E5E5]"
    :placeholder="placeholder"
  />
</template>
