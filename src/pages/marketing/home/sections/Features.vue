<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import SectionWrapper from '../../shared/SectionWrapper.vue';

interface IFeatures {
  title: string;
  heading: string;
  caption: string;
  img: { src: string; alt: string; class: string };
}

const features: IFeatures[] = [
  {
    title: 'BOOKMARKING',
    heading: 'A Personalized Collection of All My Saved Bookmarks in One Convenient Place',
    caption:
      'Easily store, organize, and access all your saved links in one central location, ensuring that your important websites, articles, and resources are always at your fingertips whenever you need them.',
    img: {
      src: '/images/landing-page/features/feature-1.png',
      alt: 'Dashboard preview',
      class: 'items-end justify-end'
    }
  },
  {
    title: 'FOLDERS',
    heading: 'Sync Bookmarks from Multiple Browsers',
    caption: 'Import and synchronize bookmarks from all your connected browsers in one place.',
    img: {
      src: '/images/landing-page/features/feature-2.svg',
      alt: 'Browsers',
      class: 'items-center justify-center'
    }
  },
  {
    title: 'SHARING',
    heading:
      'Bookmarks, links, and collections that have been shared with me by others for easy access and collaboration.',
    caption:
      'A comprehensive collection of bookmarks and organized folders that have been shared with you by others, allowing for seamless collaboration and easy access to important links.',
    img: {
      src: '/images/landing-page/features/feature-3.png',
      alt: 'Share bookmarks',
      class: 'justify-end'
    }
  }
];
</script>

<template>
  <SectionWrapper
    v-for="(feature, index) in features"
    :key="feature.title"
    :class="
      cn('container flex-col max-lg:gap-15', {
        'lg:flex-row': index !== 1,
        'lg:flex-row-reverse': index === 1
      })
    "
  >
    <div class="basis-1/2 lg:h-120.25 flex flex-col justify-between gap-15 lg:gap-0">
      <div class="flex flex-col gap-5">
        <p class="text-xs font-semibold leading-3.5 text-primary-100">{{ feature.title }}</p>
        <div class="flex flex-col gap-4">
          <h3
            class="text-[27px] font-semibold leading-8.75 text-black-80 -tracking-[1px] md:-tracking-[2px]"
          >
            {{ feature.heading }}
          </h3>

          <Button class="w-31.5 md:w-48.25 h-12.5 md:h-13.75 rounded-full p-4">Get Started</Button>
        </div>
      </div>

      <p class="py-7 border-t border-gray-100 md:text-lg leading-6 md:leading-6.5 text-black-80">
        {{ feature.caption }}
      </p>
    </div>

    <div
      :class="
        cn(
          'w-full lg:basis-1/2 max-md:aspect-square md:h-120.25 flex bg-secondary rounded-[20px]',
          feature.img.class
        )
      "
    >
      <img
        :src="feature.img.src"
        :alt="feature.img.alt"
        class="max-w-full max-h-full w-auto h-auto"
      />
    </div>
  </SectionWrapper>
</template>
