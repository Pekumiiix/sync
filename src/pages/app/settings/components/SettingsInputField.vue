<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { createTypedForm } from '@/utils/formUtils';

import type { AccountInformationData } from '../schemas/account-information.schema';

interface Props {
  name: keyof AccountInformationData;
  label: string;
  placeholder: string;
}

defineProps<Props>();

const TypedFormField = createTypedForm<AccountInformationData>();
</script>

<template>
  <TypedFormField
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
  </TypedFormField>
</template>
