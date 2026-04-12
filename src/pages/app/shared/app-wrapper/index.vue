<script setup lang="ts">
import { useRouter } from 'vue-router';

import { SettingsIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

import { NotificationPanel } from './sections';

interface Props {
  page?: string;
}

defineProps<Props>();

const router = useRouter();
</script>

<template>
  <header class="w-full h-23.25 flex items-center py-5 px-6.5 border-b border-[#292D321A]">
    <nav class="size-full flex items-center justify-between">
      <h5
        v-if="page"
        class="text-lg leading-6 font-semibold text-black-90 -tracking-[1%]"
      >
        {{ page }}
      </h5>

      <Button
        v-else
        @click="router.back()"
        variant="ghost"
        class="size-fit flex items-center gap-1.5 p-0! text-xl font-medium leading-7 -tracking-[1%] text-black-90 hover:bg-transparent"
      >
        <img
          src="/images/app/icons/arrow-left.png"
          alt="Arrow left"
          class="size-6"
        />
        Back
      </Button>

      <div class="flex items-center justify-between gap-3">
        <div class="size-fit relative">
          <NotificationPanel />

          <span class="absolute size-3 rounded-full bg-[#D54524] -top-0.5 right-0" />
        </div>

        <Button
          as-child
          variant="outline"
          class="size-10 rounded-full p-2.75 bg-[#F9F9FA] border-stroke-1/10"
        >
          <router-link to="/app/settings?tab=account">
            <SettingsIcon class="size-4.5" />
          </router-link>
        </Button>
      </div>
    </nav>
  </header>

  <slot />
</template>
