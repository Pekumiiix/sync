<script setup lang="ts">
import { Button } from '@/components/ui/button';
import SectionDetails from '@/pages/marketing/shared/SectionDetails.vue';
import SectionWrapper from '@/pages/marketing/shared/SectionWrapper.vue';
</script>

<template>
  <SectionWrapper class="bg-secondary">
    <div
      class="container w-full flex flex-col lg:flex-row items-center gap-15 md:gap-10 justify-between py-10 md:py-20 px-6 md:px-15 rounded-[28px] md:rounded-[50px] bg-primary-100"
    >
      <div class="basis-2/5 flex flex-col gap-7.5">
        <SectionDetails
          heading="Take Control of Your Bookmarks"
          caption="Save, organize, and access your favorite links anytime, anywhere—across all your browsers and devices."
          :class-names="{
            wrapper: 'gap-5 items-start',
            heading: 'text-white text-left',
            caption: 'text-white text-left font-poppins'
          }"
        />

        <Button
          class="w-30.5 md:w-48.25 h-13.75 rounded-full p-4 bg-white text-primary-100 text-base leading-7 font-semibold hover:bg-white-90"
        >
          Get Started
        </Button>
      </div>

      <img
        src="/images/landing-page/cta/cta.svg"
        alt="Dashboard Cards"
        class="w-full lg:w-1/2 h-auto"
      />
    </div>
  </SectionWrapper>
</template>
