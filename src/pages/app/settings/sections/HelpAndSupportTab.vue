<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useClipboard } from '@/hooks/useClipboard';

import { SettingsSubSectionWrapper, SettingsWrapper } from '../wrappers';

const { copy, hasCopied } = useClipboard();

const supportEmail = 'amaopelumi96@gmail.com';
</script>

<template>
  <SettingsWrapper
    title="Help and support"
    description="Bookmark management"
  >
    <SettingsSubSectionWrapper
      title="Email"
      :description="supportEmail"
      class="pt-0! border-none"
    >
      <Button
        :disabled="hasCopied"
        @click="copy(supportEmail)"
        class="w-27.25 h-7 rounded-full px-3 py-1.5 text-[10px] font-medium leading-[100%]"
      >
        {{ hasCopied ? 'Copied!' : 'Copy email' }}
      </Button>
    </SettingsSubSectionWrapper>

    <SettingsSubSectionWrapper
      title="Phone"
      description="+234 807 712 1405"
    >
      <Button
        as-child
        class="w-27.25 h-7 rounded-full px-3 py-1.5 text-[10px] font-medium leading-[100%]"
      >
        <a href="tel:+2348077121405"> Call </a>
      </Button>
    </SettingsSubSectionWrapper>
  </SettingsWrapper>
</template>
