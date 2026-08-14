<script setup lang="ts">
import { BaseDialog } from '@/components/re-useable';
import { Button } from '@/components/ui/button';

const displayBool = defineModel({ default: false });
</script>

<template>
  <BaseDialog
    v-model="displayBool"
    title="Want to update a folder password?"
    description="You’ll need to upgrade to Basic first — unlock this feature and more!"
    :class-names="{
      content: 'w-87.25 h-fit p-6 rounded-[15px] border border-[#292D3233] flex flex-col gap-6',
      header: 'flex flex-col items-center gap-1',
      title: 'text-2xl leading-9.5 font-medium text-black-90 tracking-[-1%] text-center',
      description: 'text-base text-black-60 text-center'
    }"
  >
    <div class="w-full">
      <Button
        as-child
        class="w-full h-12 px-6 py-3.75 rounded-full font-inter-tight font-semibold text-[15px]"
      >
        <router-link :to="{ name: 'Pricing' }"> Upgrade Plan </router-link>
      </Button>
    </div>
  </BaseDialog>
</template>
