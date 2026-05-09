<script setup lang="ts">
import { BaseForm } from '@/components/re-useable';

interface Props {
  name: string;
  label: string;
}

defineProps<Props>();
</script>

<template>
  <BaseForm
    :name="name"
    :label="label"
    :class-names="{
      label: 'text-[26px] text-black-100'
    }"
  >
    <template #default="fieldProps">
      <slot v-bind="fieldProps" />
    </template>
  </BaseForm>
</template>
