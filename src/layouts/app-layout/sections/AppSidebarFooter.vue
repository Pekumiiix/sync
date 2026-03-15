<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { SidebarFooter } from '@/components/ui/sidebar';
</script>

<template>
  <SidebarFooter class="w-full flex flex-col gap-3 pt-6 pb-4 px-3 rounded-[20px] bg-primary-100">
    <div
      class="size-10.75 rounded-full bg-[linear-gradient(132.18deg,#EBE239_12.73%,#4CF5A3_48.28%,#6CCDED_83.84%)] shadow-[0px_4px_4px_0px_#00000040_inset]"
    />

    <div class="flex flex-col gap-1">
      <p class="text-base font-medium leading-5.5 text-white -tracking-[1%]">Step Into Pro Mode</p>
      <p class="text-sm text-white-90">
        Level up with tools and benefits designed to help you do more, faster.
      </p>
    </div>

    <Button
      class="w-full h-9.5 flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white border border-white/20 cursor-pointer hover:bg-white-90"
    >
      <img
        src="/images/app/sidebar/sparkle.gif"
        alt="Sparkle"
        class="size-10"
      />
      <span class="text-xs font-inter-tight font-semibold text-primary-100 leading-[100%]"
        >Upgrade to pro</span
      >
    </Button>
  </SidebarFooter>
</template>
