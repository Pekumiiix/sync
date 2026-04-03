<script setup lang="ts">
import { SettingsWrapper } from '../components';
</script>

<template>
  <SettingsWrapper
    title="Account information"
    description="Manage your personal details, login credentials, and security settings"
    v-on:cancel="() => {}"
    v-on:save="() => {}"
  >
    <p>Hello world</p>
  </SettingsWrapper>
</template>
