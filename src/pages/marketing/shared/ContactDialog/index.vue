<script setup lang="ts">
import { ref } from 'vue';

import { ContactForm, ContactSuccess } from './sections';

const isContactFormOpen = defineModel<boolean>({ default: false });
const showSuccess = ref(false);

function handleSuccess() {
  isContactFormOpen.value = false;
  showSuccess.value = true;
}
</script>

<template>
  <ContactForm
    v-model="isContactFormOpen"
    @success="handleSuccess"
  />

  <ContactSuccess v-model="showSuccess" />
</template>
