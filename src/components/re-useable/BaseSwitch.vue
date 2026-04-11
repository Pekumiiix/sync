<script setup lang="ts">
import { Switch } from '@/components/ui/switch';

defineProps<{
  id?: string;
}>();

const checked = defineModel<boolean>();
</script>

<template>
  <Switch
    :id="id"
    v-model:model-value="checked"
    class="cursor-pointer"
  />
</template>
