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

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.style.opacity = '0';
}
</script>

<template>
  <div :class="cn('grid grid-cols-2 gap-0.5 bg-[#E9E9EC80]', classNames?.container)">
    <div
      :class="cn('aspect-square bg-[#DFDDE4] relative overflow-hidden', classNames?.images?.top)"
    >
      <img
        v-if="images?.[0]"
        :src="images[0]"
        class="w-full h-full object-cover object-center transition-opacity duration-200"
        @error="handleImageError"
      />
    </div>

    <div
      :class="cn('aspect-square bg-[#DFDDE4] relative overflow-hidden', classNames?.images?.top)"
    >
      <img
        v-if="images?.[1]"
        :src="images[1]"
        class="w-full h-full object-cover object-center transition-opacity duration-200"
        @error="handleImageError"
      />
    </div>

    <div
      :class="cn('col-span-2 bg-[#DFDDE4] relative overflow-hidden', classNames?.images?.bottom)"
    >
      <img
        v-if="images?.[2]"
        :src="images[2]"
        class="w-full h-full object-cover object-center transition-opacity duration-200"
        @error="handleImageError"
      />
    </div>
  </div>
</template>
