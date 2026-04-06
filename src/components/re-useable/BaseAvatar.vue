<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props {
  src: string;
  fallback: string;
}

defineProps<Props>();
</script>

<template>
  <Avatar>
    <AvatarImage
      :src="src"
      class="object-center object-cover"
    />
    <AvatarFallback class="bg-primary-100 text-primary-10">{{ fallback }}</AvatarFallback>
  </Avatar>
</template>
