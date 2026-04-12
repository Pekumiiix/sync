<script setup lang="ts">
import { cn } from '@/lib/utils';

interface Props {
  images?: string[];
  classNames?: {
    container?: string;
    images?: {
      top?: string;
      bottom?: string;
    };
  };
}

defineProps<Props>();
</script>

<template>
  <div :class="cn('grid grid-cols-2 gap-0.5 bg-[#E9E9EC80]', classNames?.container)">
    <img
      :src="images?.[0]"
      :class="cn('aspect-square object-cover object-center bg-[#DFDDE4]', classNames?.images?.top)"
    />

    <img
      :src="images?.[1]"
      :class="
        cn('aspect-square object-cover object-center bg-[#DFDDE4]', classNames?.images?.bottom)
      "
    />

    <img
      :src="images?.[2]"
      :class="cn('col-span-2 object-cover object-center bg-[#DFDDE4]', classNames?.images?.bottom)"
    />
  </div>
</template>
