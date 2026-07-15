<script setup lang="ts">
import { getInitials } from '@/utils/stringutils';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props {
  src?: string | null;
  fallback: string;
}

defineProps<Props>();
</script>

<template>
  <Avatar :title="fallback">
    <AvatarImage
      v-if="src"
      :src="src"
      class="object-center object-cover"
    />
    <AvatarFallback class="bg-primary-100 text-sm text-primary-10">{{
      getInitials(fallback)
    }}</AvatarFallback>
  </Avatar>
</template>
