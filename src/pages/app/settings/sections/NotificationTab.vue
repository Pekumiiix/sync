<script setup lang="ts">
import { SettingsWrapper } from '../wrappers';
</script>

<template>
  <SettingsWrapper
    title="Notifications"
    description="Bookmark management"
    v-on:cancel="() => {}"
    v-on:save="() => {}"
  >
    <p>Hello world</p>
  </SettingsWrapper>
</template>
