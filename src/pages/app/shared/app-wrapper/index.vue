<script setup lang="ts">
import { NotificationIcon, SettingsIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface Props {
  page: string;
}

defineProps<Props>();
</script>

<template>
  <header class="w-full h-23.25 flex items-center py-5 px-6.5 border-b border-[#292D321A]">
    <nav class="size-full flex items-center justify-between">
      <h5 class="text-lg leading-6 font-semibold text-black-90 -tracking-[1%]">{{ page }}</h5>

      <div class="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          class="size-10 rounded-full p-2.75 bg-[#F9F9FA] border-stroke-1/10"
        >
          <NotificationIcon class="size-4.5" />
        </Button>

        <Button
          variant="outline"
          class="size-10 rounded-full p-2.75 bg-[#F9F9FA] border-stroke-1/10"
        >
          <SettingsIcon class="size-4.5" />
        </Button>
      </div>
    </nav>
  </header>

  <slot />
</template>
