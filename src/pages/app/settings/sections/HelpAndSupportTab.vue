<script setup lang="ts">
import { SettingsWrapper } from '../components';
</script>

<template>
  <SettingsWrapper
    title="Help and support"
    description="Bookmark management"
    v-on:cancel="() => {}"
    v-on:save="() => {}"
  >
    <p>Hello world</p>
  </SettingsWrapper>
</template>
