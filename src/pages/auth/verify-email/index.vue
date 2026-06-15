<script lang="ts" setup>
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'vue-input-otp';
import { useForm } from 'vee-validate';

import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { useVerifyEmail } from '@/hooks/useAuth';
import { createAuthTypedForm } from '@/utils/formUtils';

import { AuthWrapper } from '../shared/wrappers';
import { type VerifyEmailData, verifyEmailSchema } from './schema';

const TypedFormField = createAuthTypedForm<VerifyEmailData>();

const { handleSubmit, meta, isSubmitting } = useForm<VerifyEmailData>({
  validationSchema: verifyEmailSchema
});

const { mutate, isPending } = useVerifyEmail();

const onSubmit = handleSubmit((values) => {
  mutate({
    token: values.otp
  });
});
</script>

<template>
  <AuthWrapper
    page="verify_email"
    :onSubmit="onSubmit"
    :isValid="meta.valid"
    :isLoading="isSubmitting || isPending"
  >
    <TypedFormField
      name="otp"
      label="OTP"
    >
      <template #default="fieldProps">
        <InputOTP
          v-bind="fieldProps"
          :maxlength="6"
          :pattern="REGEXP_ONLY_DIGITS_AND_CHARS"
        >
          <InputOTPSlot
            v-for="index in 6"
            :key="index"
            :index="index - 1"
            class="size-20 rounded-2xl! border! text-2xl font-medium data-[active=true]:border-primary-90 data-[active=true]:ring-0"
          />
        </InputOTP>
      </template>
    </TypedFormField>
  </AuthWrapper>
</template>
