<script setup lang="ts">
import { SettingsWrapper } from '../wrappers';
</script>

<template>
  <SettingsWrapper
    title="Bookmark management"
    description="Bookmark management"
    v-on:cancel="() => {}"
    v-on:save="() => {}"
  >
    <p>Hello world</p>
  </SettingsWrapper>
</template>
