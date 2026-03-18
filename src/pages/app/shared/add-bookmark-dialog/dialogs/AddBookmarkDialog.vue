<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { AddBookmarkDialogWrapper } from '../components';

const displayBool = defineModel<boolean>('displayType', { default: false });
</script>

<template>
  <AddBookmarkDialogWrapper v-model="displayBool">
    <div class="w-full flex items-center gap-2.5 py-5">
      <Input class="w-full h-11 p-1 pl-4 rounded-full border-[#E8E8E8]" />

      <Button class="w-26.25 h-11 px-4 py-2 rounded-full">Import</Button>
    </div>
  </AddBookmarkDialogWrapper>
</template>
