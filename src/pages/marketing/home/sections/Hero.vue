<script setup lang="ts">
import { ArrowRight, PlayCircle } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
</script>

<template>
  <section
    class="w-full flex flex-col items-center gap-30 px-4 md:px-18 lg:px-36.25 pt-43.25 md:pt-70.5 bg-primary max-md:bg-[url('/images/landing-page/hero/mobile-bg.png')] bg-contain bg-no-repeat"
  >
    <div class="max-w-181 w-full flex flex-col items-center gap-11">
      <div class="flex flex-col items-center gap-6 md:gap-4">
        <div
          class="flex items-center gap-2.5 md:gap-4 py-2 px-3 md:py-2.5 md:px-4 bg-[#1F2132] border border-[#E4E4EC33] rounded-full"
        >
          <img
            src="/images/landing-page/hero/sparkles.png"
            alt="Sparkles"
            class="size-3.5 md:size-8 shrink-0"
          />
          <p class="text-sm md:text-xl font-medium leading-5.5 md:leading-9.25 text-[#E4E4EC]">
            Universal bookmark sync, simplified.
          </p>
        </div>

        <div class="flex flex-col gap-3 md:gap-10">
          <p
            class="text-center text-[27px] md:text-[72px] leading-8.75 md:leading-23 -tracking-[2px] font-semibold text-white"
          >
            Sync Bookmarks Across All Browsers
          </p>
          <p class="text-center text-xl md:text-[32px] leading-7 md:leading-12.5 text-[#CCCCCC]">
            Access and organize your bookmarks across any browser and device with seamless syncing.
          </p>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3">
        <Button
          class="w-54.75 md:w-46.5 h-14 md:h-13 flex items-center gap-1.25 text-lg md:text-base font-semibold font-inter-tight leading-[100%] py-4 px-5 rounded-full"
          >Download Plugin
          <ArrowRight
            :size="20"
            color="var(--color-primary-10)"
        /></Button>

        <Button
          variant="outline"
          class="w-54.75 md:w-46.5 h-14 md:h-13 flex items-center gap-2 py-4 px-5 rounded-full bg-[#1F1A31] border-black-90 text-lg md:text-base text-white-90 leading-[100%] font-inter-tight hover:bg-[#1F1A31]/90 hover:text-white-90"
        >
          <PlayCircle
            :size="20"
            color="var(--color-white-90)"
          />How it works</Button
        >
      </div>
    </div>

    <img
      src="/images/landing-page/hero/hero.svg"
      alt="Dashboard Preview"
      class="container w-full h-auto"
    />
  </section>
</template>
