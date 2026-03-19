<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next';

import { BaseDialog } from '@/components/re-useable';

interface Props {
  isLoading?: boolean;
}

defineProps<Props>();

const displayBool = defineModel<boolean>({ default: false });
</script>

<template>
  <BaseDialog
    v-model="displayBool"
    title="Add bookmark manually"
    description="Add the URL and we’ll handle the logo and meta tags for you"
    :img="{ src: '/images/app/dialogs/link.png', alt: 'Link', class: 'size-10 shrink-0' }"
    :classNames="{
      content:
        'w-[625px] h-fit flex flex-col gap-3 items-center rounded-[25px] pt-10 pb-6 border border-stroke-1/20 shadow-[0px_4px_215px_0px_#00000026] [&>button]:hidden',
      header: 'flex flex-col items-center gap-1',
      title: 'text-xl font-medium leading-7 text-black-90 -tracking-[1%]',
      description: 'text-sm leading-4.5 text-black-80 font-normal'
    }"
  >
    <div
      v-if="isLoading"
      class="flex flex-col items-center gap-2"
    >
      <LoaderCircle
        color="#141414"
        class="size-12 animate-spin"
      />
      <p class="text-xs leading-[160%] text-black-70">
        Fetching the link details takes ~30 seconds!
      </p>
    </div>

    <slot v-else />
  </BaseDialog>
</template>
