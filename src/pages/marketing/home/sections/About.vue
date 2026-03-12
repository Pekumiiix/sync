<script setup lang="ts">
import { Button } from '@/components/ui/button';

import SectionWrapper from '../../shared/SectionWrapper.vue';
</script>

<template>
  <SectionWrapper class="bg-secondary">
    <div class="flex flex-col items-center gap-2 md:gap-5">
      <p class="text-xs leading-3.5 text-primary-100 font-semibold">BOOKMARKING</p>
      <h3
        class="text-[30px] md:text-[27px] leading-10 md:leading-8.75 text-black-90 -tracking-[2px] text-center font-semibold"
      >
        Invite Others, Organize Together
      </h3>
    </div>

    <img
      src="/images/landing-page/about/about.svg"
      alt="Invite member dialog"
      class="w-177 h-auto aspect-square"
    />

    <div class="max-w-211.5 flex flex-col items-center gap-10 md:gap-8">
      <p class="text-center md:text-xl leading-6 md:leading-7.5 text-black-80">
        Create shared folders, manage permissions, and collaborate on your favorite saved links with
        ease. Whether you’re working on a project or sharing resources, it’s all possible in one
        organized space
      </p>

      <Button
        class="h-12.5 md:h-17 py-4 md:py-5 px-6.75 rounded-full text-sm md:text-[22px] font-semibold font-inter-tight leading-[100%]"
        >Download Plugin</Button
      >
    </div>
  </SectionWrapper>
</template>
