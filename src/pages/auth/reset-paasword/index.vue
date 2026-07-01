<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useForm } from 'vee-validate';

import { useResetPassword } from '@/hooks/useAuth';
import { createAuthTypedForm } from '@/utils/formUtils';

import { AuthPasswordInput } from '../shared/components';
import { AuthWrapper } from '../shared/wrappers';
import { type ResetPasswordData, resetPasswordSchema } from './schema';

const TypedFormField = createAuthTypedForm<ResetPasswordData>();

const { handleSubmit, meta, isSubmitting } = useForm<ResetPasswordData>({
  validationSchema: resetPasswordSchema
});

const { mutate, isPending } = useResetPassword();

const route = useRoute();

const refreshToken = route.query.reset_token as string;

const onSubmit = handleSubmit((values) => {
  mutate({
    token: refreshToken,
    password: values.password
  });
});
</script>

<template>
  <AuthWrapper
    page="reset_password"
    :onSubmit="onSubmit"
    :isValid="meta.valid"
    :isLoading="isSubmitting || isPending"
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
