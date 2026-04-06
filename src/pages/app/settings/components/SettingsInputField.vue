<script setup lang="ts">
import { BaseForm } from '@/components/re-useable';
import { Input } from '@/components/ui/input';

interface Props {
  name: string;
  label: string;
  placeholder: string;
}

defineProps<Props>();
</script>

<template>
  <BaseForm
    :name="name"
    :label="label"
    :class-names="{ item: 'w-full', label: 'text-sm font-medium leading-[160%]' }"
  >
    <template #default="fieldProps">
      <Input
        v-bind="fieldProps"
        :placeholder="placeholder"
        class="h-10.5 text-sm font-regular leading-5 placeholder:text-black-50 py-2.75 px-4.5 rounded-full"
      />
    </template>
  </BaseForm>
</template>
