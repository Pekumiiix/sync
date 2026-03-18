<script setup lang="ts">
import { ActionDialogWrapper } from '../..';

const displayBool = defineModel<boolean>('displayType', { default: false });
</script>

<template>
  <ActionDialogWrapper
    v-model="displayBool"
    title="Add bookmark manually"
    description="Enter the URL and details below to save a new bookmark to your collection."
    content-class="w-[625px] max-h-[656px] h-[90vh]"
    :show-description="false"
  >
    <div class="h-full px-6 pb-6">
      <p>Bookmark details</p>
    </div>
  </ActionDialogWrapper>
</template>
