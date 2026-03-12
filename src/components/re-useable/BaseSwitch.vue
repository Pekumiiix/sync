<script setup lang="ts">
import { Switch } from '@/components/ui/switch';

const props = defineProps<{
  modelValue: boolean;
  id?: string;
  class?: string;
}>();

const emit = defineEmits(['update:modelValue']);

function handleUpdate(checked: boolean) {
  emit('update:modelValue', checked);
}
</script>

<template>
  <Switch
    :id="id"
    :checked="modelValue"
    @update:model-value="handleUpdate"
    :class="props.class"
  />
</template>
