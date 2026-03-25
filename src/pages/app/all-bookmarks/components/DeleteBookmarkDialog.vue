<script setup lang="ts">
import { TrashIcon } from '@/components/icons';
import { BaseAlertDialog } from '@/components/re-useable';

const displayBool = defineModel<boolean>({ default: false });
</script>

<template>
  <BaseAlertDialog
    v-model:open="displayBool"
    title="Delete bookmark"
    description="Are you sure you want to delete this bookmark, you won’t be a able to restore it after this action has been completed"
    :confirm="{ label: 'Yes, delete', action: () => {} }"
    :cancel="{ label: `No, don't delete`, action: () => {} }"
    :classNames="{
      content:
        'w-100! flex flex-col items-center px-0 pb-0 pt-10 rounded-[30px] border-stroke-1/20 space-y-0',
      header: 'flex flex-col gap-1 items-center px-6',
      title: 'text-2xl font-medium leading-9.5 text-black-90 text-center',
      description: 'text-base text-black-60 text-center',
      footer: 'w-full border-t border-stroke-1/10 px-9 py-7.5 flex items-center gap-4',
      cancel:
        'w-1/2 h-11 py-2 px-4 rounded-full bg-[#F8F8F9] text-base font-medium leading-5.5 text-black-100 border-none',
      confirm:
        'w-1/2 h-11 py-2 px-4 rounded-full bg-[#FF2F00] hover:bg-[#FF2F00]/90 text-base font-medium leading-5.5 text-white'
    }"
  >
    <div class="size-15.25 flex items-center justify-center rounded-full bg-[#FF2F000A]">
      <TrashIcon class="size-7 stroke-[#FF2F00]" />
    </div>
  </BaseAlertDialog>
</template>
