<script setup lang="ts">
import { SettingsWrapper } from '../components';
</script>

<template>
  <SettingsWrapper
    title="Sync settings"
    description="Control how your bookmarks sync across browsers."
    v-on:cancel="() => {}"
    v-on:save="() => {}"
  >
    <p>Hello world</p>
  </SettingsWrapper>
</template>
