<script setup lang="ts">
import { cn } from '@/lib/utils';

import { SectionDetails,SectionWrapper } from '../../shared';

const howItWorks = [
  {
    img: '/images/landing-page/how-it-works/hiw-1.svg',
    alt: 'Plugin',
    heading: 'Install the extension',
    caption: 'Add our extension to your browser and start saving bookmarks instantly.'
  },
  {
    img: '/images/landing-page/how-it-works/hiw-2.svg',
    alt: 'Sign Up',
    heading: 'Sign Up',
    caption:
      'Create your account in just a few clicks and start saving, organizing, and sharing your favorite links effortlessly.'
  },
  {
    img: '/images/landing-page/how-it-works/hiw-3.svg',
    alt: 'Dashboard Preview',
    heading: 'Start organizing',
    caption: 'Sort your bookmarks into easy-to-navigate folders.'
  }
];
</script>

<template>
  <SectionWrapper class="lg:bg-secondary">
    <SectionDetails
      heading="How It Works"
      caption="Save, organize, and access your favorite links effortlessly with smart collections, seamless sharing, and automatic backups"
    />

    <div class="hidden relative container w-full lg:flex flex-row -space-x-5 mt-14">
      <img
        v-for="(item, index) in howItWorks"
        :key="item.heading"
        :src="item.img"
        :alt="item.alt"
        :class="
          cn('w-[35%] max-h-87 h-auto aspect-square', {
            '-mt-14': index === 1,
            'z-10': index === 0
          })
        "
      />
    </div>

    <div
      class="container flex flex-col max-lg:items-center lg:grid grid-cols-3 gap-20 md:gap-10 lg:gap-5 py-9"
    >
      <div
        v-for="item in howItWorks"
        :key="item.heading"
        class="w-full flex flex-col gap-5"
      >
        <div
          class="flex lg:hidden items-center justify-center w-full bg-secondary rounded-[20px] p-5"
        >
          <img
            :src="item.img"
            :alt="item.alt"
            class="max-w-full aspect-square"
          />
        </div>

        <div class="flex flex-col gap-2">
          <h4
            class="text-2xl leading-9.5 md:leading-7.5 font-semibold -tracking-[1%] text-black-90"
          >
            {{ item.heading }}
          </h4>

          <p class="md:text-[22px] leading-6 md:leading-[160%] text-black-80">
            {{ item.caption }}
          </p>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>
