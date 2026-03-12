<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import SectionDetails from '../../shared/SectionDetails.vue';
import SectionWrapper from '../../shared/SectionWrapper.vue';

interface IWhyUs {
  image: string;
  title: string;
  caption: string;
  class?: string;
  buttonName?: string;
}

const whyUs: IWhyUs[] = [
  {
    image: '/images/landing-page/why-us/chrome.svg',
    title: 'Google Chrome',
    caption: 'Install our Chrome extension to start syncing and organizing bookmarks instantly',
    class:
      'bg-[linear-gradient(90deg,#25C451_0%,#E1392E_32.11%,#FAC015_67.69%,#1A73E9_100%)] hover:bg-[linear-gradient(90deg,#25C451_0%,#E1392E_32.11%,#FAC015_67.69%, #1A73E9 100%)]/90',
    buttonName: 'Chrome'
  },
  {
    image: '/images/landing-page/why-us/opera.svg',
    title: 'Opera',
    caption:
      'Start syncing across devices add the extension directly to Opera from the Chrome Web Store',
    class: 'bg-[#D92F2F] hover:bg-[#D92F2F]/90'
  },
  {
    image: '/images/landing-page/why-us/others.svg',
    title: 'Other browsers',
    caption: 'Install the extension and get instant access to all your bookmarks—everywhere',
    buttonName: 'plugin'
  }
];
</script>

<template>
  <SectionWrapper class="container max-md:gap-2.5">
    <SectionDetails
      heading="Smater Saving and Sharing"
      caption="Save more than just bookmarks—organize, access, and share your favorite links effortlessly,
        all in one smart and convenient place."
      :class-names="{ wrapper: 'gap-3' }"
    />

    <div
      class="flex flex-col md:flex-row flex-wrap items-center md:items-center md:justify-center lg:grid grid-cols-3 gap-6"
    >
      <div
        v-for="item in whyUs"
        :key="item.title"
        class="w-[85%] md:w-[45%] lg:w-full flex flex-col items-center py-10 gap-6.25 rounded-xl"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="size-15 md:max-w-22 md:max-h-22 w-auto h-auto"
        />

        <div class="flex flex-col items-center gap-1.25">
          <p
            class="text-2xl md:text-[21px] leading-9.5 md:leading-7 font-medium -tracking-[1%] text-[#13213B]"
          >
            {{ item.title }}
          </p>
          <p class="text-70 text-black-70 text-center md:text-[15px] leading-6">
            {{ item.caption }}
          </p>
        </div>

        <Button
          :class="
            cn(
              'w-fit h-12.5 md:h-17 rounded-full py-4 md:py-5 px-5.75 md:px-6.75 text-sm md:text-[22px] font-semibold font-inter-tight leading-[100%] text-white-90',
              item.class
            )
          "
          >Download for {{ item.buttonName ?? item.title }}</Button
        >
      </div>
    </div>
  </SectionWrapper>
</template>
