<script setup lang="ts">
import { useForm } from 'vee-validate';

import { createAuthTypedForm } from '@/utils/formUtils';

import { AuthPasswordInput } from '../shared/components';
import { AuthWrapper } from '../shared/wrappers';
import { type ResetPasswordData, resetPasswordSchema } from './schema';

const TypedFormField = createAuthTypedForm<ResetPasswordData>();

const { handleSubmit, meta, isSubmitting } = useForm<ResetPasswordData>({
  validationSchema: resetPasswordSchema
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});
</script>

<template>
  <AuthWrapper
    page="reset_password"
    :onSubmit="onSubmit"
    :isValid="meta.valid"
    :isLoading="isSubmitting"
  >
    <TypedFormField
      name="password"
      label="Password"
    >
      <template #default="fieldProps">
        <AuthPasswordInput v-bind="fieldProps" />
      </template>
    </TypedFormField>

    <TypedFormField
      name="confirmPassword"
      label="Confirm Password"
    >
      <template #default="fieldProps">
        <AuthPasswordInput
          v-bind="fieldProps"
          placeholder="Confirm password"
        />
      </template>
    </TypedFormField>
  </AuthWrapper>
</template>
