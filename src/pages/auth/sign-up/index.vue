<script setup lang="ts">
import { useForm } from 'vee-validate';

import { useSignUp } from '@/hooks/useAuth';
import { createAuthTypedForm } from '@/utils/formUtils';

import { AuthInput, AuthPasswordInput } from '../shared/components';
import { AuthWrapper } from '../shared/wrappers';
import { type SignUpData, signUpSchema } from './schema';

const TypedFormField = createAuthTypedForm<SignUpData>();

const { handleSubmit, meta, isSubmitting } = useForm<SignUpData>({
  validationSchema: signUpSchema
});

const { mutate, isPending } = useSignUp();

const onSubmit = handleSubmit((values) => {
  const names = values.name.trim().split(' ');

  const first_name = names[0] || '';
  const last_name = names.slice(1).join(' ') || '';

  mutate({
    first_name,
    last_name,
    email: values.email,
    password: values.password
  });
});
</script>

<template>
  <AuthWrapper
    page="sign_up"
    :onSubmit="onSubmit"
    :isValid="meta.valid"
    :isLoading="isSubmitting || isPending"
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
