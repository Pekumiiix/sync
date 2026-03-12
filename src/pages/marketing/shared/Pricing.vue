<script setup lang="ts">
import { computed,ref } from 'vue';

import { pricingPlans } from '@/components/constants/pricing-plans';
import BaseSwitch from '@/components/re-useable/BaseSwitch.vue';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import ContactDialog from './ContactDialog/index.vue';
import SectionDetails from './SectionDetails.vue';
import SectionWrapper from './SectionWrapper.vue';

const open = ref(false);
const isYearly = ref(false);

const plans = computed(() => {
  const cycle = isYearly.value ? 'yearly' : 'monthly';
  return pricingPlans(cycle);
});
</script>

<template>
  <SectionWrapper
    class="bg-primary bg-[url('/images/landing-page/pricing/bg.png')] bg-contain bg-no-repeat"
  >
    <SectionDetails
      heading="Unlock the Full Power of Your Bookmarks"
      caption="Go beyond saving. Premium gives you advanced tools to organize, collaborate, and preserve everything you care about online."
      :class-names="{ heading: 'text-white', caption: 'text-white' }"
    />

    <div class="w-full flex items-center justify-center gap-3.5 lg:gap-5">
      <Label
        for="cycle"
        class="text-sm md:text-lg leading-4.5 md:leading-6.5 text-white-80 hover:text-white cursor-pointer"
        >Monthly</Label
      >

      <BaseSwitch
        id="cycle"
        v-model="isYearly"
        class="h-8 md:h-13 w-15 md:w-22.75 [&>span]:size-8 md:[&>span]:size-13 [&>span]:data-[state=checked]:translate-x-6.5 md:[&>span]:data-[state=checked]:translate-x-10"
      />

      <Label
        for="cycle"
        class="text-lg leading-6.5 text-white-80 hover:text-white cursor-pointer"
        >Annually</Label
      >

      <p
        class="h-8 md:h-13 flex items-center justify-center max-md:text-xs font-inter font-semibold text-primary-20 px-2.25 md:px-3 rounded-full border border-primary-90"
      >
        Save upto 20%
      </p>
    </div>

    <div class="flex flex-col gap-6">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="plan in plans"
          :key="plan.plan_name"
          class="w-full flex flex-col gap-10 py-7.5 md:py-13.75 px-7 border border-black-90 rounded-[20px]"
        >
          <div class="flex flex-col gap-7.5">
            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-1.5">
                <h2
                  :class="
                    cn(
                      'capitalize text-[30px] md:text-4xl leading-10 md:leading-11 font-semibold -tracking-[1px] bg-linear-to-r bg-clip-text text-transparent',
                      {
                        'to-[#EC4CF5] from-[#96DAFF]': plan.plan_name === 'free',
                        'to-[#90D537] from-[#DE929E]': plan.plan_name === 'basic',
                        'to-[#C2D537] from-[#2DBEC9]': plan.plan_name === 'standard'
                      }
                    )
                  "
                >
                  {{ plan.plan_name }}
                </h2>
                <p class="text-xl leading-7.5 text-white-90">For {{ plan.usecase }}</p>
              </div>
              <p
                class="text-[66px] md:text-[70px] leading-21 md:leading-30 text-white-90 font-semibold"
              >
                ${{ plan.price }}
              </p>
            </div>
            <Button
              class="h-14.5 py-3.5 px-7.5 rounded-full bg-white text-base font-medium font-poppins leading-7.5 text-[#13213B] hover:bg-white-90"
              >Get Started</Button
            >
          </div>

          <div class="h-0.5 w-full bg-[#CBCED3] opacity-10" />

          <div class="flex flex-col gap-3">
            <div
              v-for="benefit in plan.benefits"
              :key="benefit"
              class="flex items-center gap-3"
            >
              <img
                src="/images/landing-page/pricing/check-circle.png"
                alt="Check Circle"
                class="size-5 rounded-full shrink-0"
              />
              <p class="text-[22px] leading-[160%] font-inter text-white-90">{{ benefit }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-15 md:gap-5 py-12 px-7 md:px-9.5 rounded-[30px] bg-[#FFFFFF08] border border-black-90"
      >
        <div class="max-w-125 flex flex-col gap-2.5">
          <h4 class="text-2xl font-semibold leading-7.5 -tracking-[1%] text-white-90">
            Not seeing the plan that works best for you?
          </h4>
          <p class="text-[22px] leading-[160%] font-inter text-white-70">
            No worries—we’ve got you. Whether you’re a growing team or have unique requirements,
            we’re happy to chat and tailor something just for you.
          </p>
        </div>

        <Button
          @click="open = true"
          class="w-48.25 h-13.75 rounded-full text-base leading-7 font-poppins text-white"
        >
          Contact Us
        </Button>
      </div>
    </div>

    <ContactDialog
      :open="open"
      @open-change="(val) => (open = val)"
    />
  </SectionWrapper>
</template>
