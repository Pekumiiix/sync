<script setup lang="ts">
import { cn } from '@/lib/utils';

interface Props {
  heading: string;
  caption: string;
  classNames?: { wrapper?: string; heading?: string; caption?: string };
}

defineProps<Props>();
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-2', classNames?.wrapper)">
    <h2
      :class="
        cn(
          'text-center leading-10 md:leading-11 text-[30px] md:text-4xl font-semibold text-black-90 -tracking-[1%]',
          classNames?.heading
        )
      "
    >
      {{ heading }}
    </h2>
    <p
      :class="
        cn(
          'max-w-203 text-center md:text-xl leading-6 md:leading-7.5 text-black-80',
          classNames?.caption
        )
      "
    >
      {{ caption }}
    </p>
  </div>
</template>
