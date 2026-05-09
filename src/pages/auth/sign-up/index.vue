<script setup lang="ts">
import { useForm } from 'vee-validate';

import { createAuthTypedForm } from '@/utils/formUtils';

import { AuthInput, AuthPasswordInput } from '../shared/components';
import { AuthWrapper } from '../shared/wrappers';
import { type SignUpData, signUpSchema } from './schema';

const TypedFormField = createAuthTypedForm<SignUpData>();

const { handleSubmit, meta, isSubmitting } = useForm<SignUpData>({
  validationSchema: signUpSchema
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});
</script>

<template>
  <AuthWrapper
    page="sign_up"
    :onSubmit="onSubmit"
    :isValid="meta.valid"
    :isLoading="isSubmitting"
  >
    <TypedFormField
      name="name"
      label="Full name"
    >
      <template #default="fieldProps">
        <AuthInput
          v-bind="fieldProps"
          placeholder="Enter full name"
        />
      </template>
    </TypedFormField>

    <TypedFormField
      name="email"
      label="Email address"
    >
      <template #default="fieldProps">
        <AuthInput
          v-bind="fieldProps"
          placeholder="Enter email address"
        />
      </template>
    </TypedFormField>

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
