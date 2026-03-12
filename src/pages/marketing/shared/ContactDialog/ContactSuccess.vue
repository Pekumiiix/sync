<script setup lang="ts">
import { useRouter } from 'vue-router';

import BaseDialog from '@/components/re-useable/BaseDialog.vue';
import { Button } from '@/components/ui/button';

const router = useRouter();

defineProps<{ open: boolean }>();

const emit = defineEmits(['open-change']);
</script>

<template>
  <BaseDialog
    :open="open"
    @open-change="emit('open-change', $event)"
    title="We've gotten your response"
    description="Thanks for reaching out! We’ve got your enquiry and will be in touch soon to help you get started"
    :img="{
      src: '/images/landing-page/pricing/checkmark.png',
      alt: 'Checkmark',
      class: 'size-35 md:size-42.75 rounded-full'
    }"
    :class-names="{
      content:
        'w-[90vw] md:min-w-175 lg:min-w-257.5 max-h-[90vh] w-full h-fit flex flex-col items-center gap-15 py-10 px-3 md:p-20 bg-white rounded-[12px] [&>button]:hidden scrollbar-none overflow-y-auto border-none',
      header: 'max-w-153.5 w-full flex flex-col items-center gap-0.5',
      title:
        'text-center text-black-100 -tracking-[1px] font-semibold text-2xl leading-[38px] md:text-4xl md:leading-11',
      description: 'text-center text-base md:text-xl leading-6 md:leading-7.5 text-black-80'
    }"
  >
    <div class="w-full">
      <Button
        class="w-full h-14 rounded-full text-base font-medium leading-7"
        @click="
          router.push('/');
          emit('open-change', false);
        "
      >
        Go to home
      </Button>
    </div>
  </BaseDialog>
</template>
