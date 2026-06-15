<script setup lang="ts">
import { useForm } from 'vee-validate';

import { useForgotPassword } from '@/hooks/useAuth';
import { createAuthTypedForm } from '@/utils/formUtils';

import { AuthInput } from '../shared/components';
import { AuthWrapper } from '../shared/wrappers';
import { type ForgotPasswordData, forgotPasswordSchema } from './schema';

const TypedFormField = createAuthTypedForm<ForgotPasswordData>();

const { handleSubmit, meta, isSubmitting } = useForm<ForgotPasswordData>({
  validationSchema: forgotPasswordSchema
});

const { mutate, isPending } = useForgotPassword();

const onSubmit = handleSubmit((values) => {
  mutate({
    email: values.email
  });
});
</script>

<template>
  <AuthWrapper
    page="forgot_password"
    :onSubmit="onSubmit"
    :isValid="meta.valid"
    :isLoading="isSubmitting || isPending"
  >
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
  </AuthWrapper>
</template>
