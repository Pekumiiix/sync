<script setup lang="ts">
import BaseAccordion from '@/components/re-useable/BaseAccordion.vue';
import SectionDetails from '@/pages/marketing/shared/SectionDetails.vue';
import SectionWrapper from '@/pages/marketing/shared/SectionWrapper.vue';

const faqs = [
  {
    value: 'item-1',
    trigger: 'What is UI Wiki?',
    content:
      'UI Wiki is a platform where users can purchase high-quality design templates and resources to enhance their projects'
  },
  {
    value: 'item-2',
    trigger: 'How can I sign up for UI Wiki?',
    content:
      'UI Wiki is a platform where users can purchase high-quality design templates and resources to enhance their projects'
  },
  {
    value: 'item-3',
    trigger: 'Is UI Wiki free to use?',
    content:
      'UI Wiki is a platform where users can purchase high-quality design templates and resources to enhance their projects'
  },
  {
    value: 'item-4',
    trigger: 'How do I reset my UI Wiki password?',
    content:
      'UI Wiki is a platform where users can purchase high-quality design templates and resources to enhance their projects'
  },
  {
    value: 'item-5',
    trigger: `Can I get a refund if I'm not satisfied with my purchase?`,
    content:
      'UI Wiki is a platform where users can purchase high-quality design templates and resources to enhance their projects'
  }
];
</script>

<template>
  <SectionWrapper class="container lg:flex-row lg:items-start">
    <SectionDetails
      heading="Frequently asked questions"
      caption="Find answers to common questions about saving, organizing, and sharing your bookmarks, plus tips on getting the most out of our features."
      :class-names="{
        wrapper: 'max-w-150 basis-1/2 lg:items-start',
        heading: 'text-center lg:text-left',
        caption: 'text-center lg:text-left'
      }"
    />

    <BaseAccordion
      :items="faqs"
      :class-names="{
        wrapper: 'basis-1/2 flex flex-col gap-10',
        item: 'gap-3 pb-0 mb-0 border-none',
        trigger:
          'text-2xl md:text-lg leading-9.5 md:leading-6 font-medium md:font-semibold text-black-80 -tracking-[1%] cursor-pointer hover:no-underline rounded-none p-0!',
        content: 'text-xl md:text-lg leading-7 md:leading-6.5 text-black-80 pb-0'
      }"
    />
  </SectionWrapper>
</template>
