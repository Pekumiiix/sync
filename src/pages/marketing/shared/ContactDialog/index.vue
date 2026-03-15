<script setup lang="ts">
import { ref } from 'vue';

import { ContactForm, ContactSuccess } from './sections';

interface Props {
  open: boolean;
}

defineProps<Props>();
const emit = defineEmits(['open-change']);

const showSuccess = ref(false);

function handleSuccess() {
  emit('open-change', false);
  showSuccess.value = true;
}
</script>

<template>
  <ContactForm
    :open="open"
    @open-change="emit('open-change', $event)"
    @success="handleSuccess"
  />

  <ContactSuccess
    :open="showSuccess"
    @open-change="showSuccess = $event"
  />
</template>
