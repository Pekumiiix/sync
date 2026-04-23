<script setup lang="ts">
import { useForm } from 'vee-validate';

import { BasePasswordInput } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { createTypedForm } from '@/utils/formUtils';

import { type AddPasswordData, addPasswordSchema } from '../schemas/add-password.schema';
import { ActionDialogWrapper } from '../wrappers';

const { handleSubmit, meta } = useForm<AddPasswordData>({
  validationSchema: addPasswordSchema,
  initialValues: {
    password: '',
    confirmPassword: ''
  }
});

const onSubmit = handleSubmit((data: AddPasswordData) => {
  console.log(data);
});

const TypedFormField = createTypedForm<AddPasswordData>();

const displayBool = defineModel<boolean>({ default: false });
</script>

<template>
  <ActionDialogWrapper
    v-model="displayBool"
    title="Restrict access by setting a password"
    content-class="max-w-[625px] w-full"
    description="Add a password for security"
  >
    <form
      @submit="onSubmit"
      class="w-full flex flex-col gap-5 px-6 pt-6 mb-6"
    >
      <TypedFormField
        name="password"
        label="Enter password"
      >
        <template #default="fieldProps">
          <BasePasswordInput v-bind="fieldProps" />
        </template>
      </TypedFormField>
      <TypedFormField
        name="confirmPassword"
        label="Confirm password"
      >
        <template #default="fieldProps">
          <BasePasswordInput v-bind="fieldProps" />
        </template>
      </TypedFormField>
    </form>

    <div class="flex items-center justify-end p-6 border-t border-stroke-1/10">
      <Button
        :disabled="!meta.valid"
        class="w-fit h-11 text-base font-medium leading-5.5 text-white -tracking-[1%] bg-black-100 py-2 px-4 rounded-full"
      >
        Save Password
      </Button>
    </div>
  </ActionDialogWrapper>
</template>
