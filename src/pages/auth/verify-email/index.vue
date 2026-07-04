<script lang="ts" setup>
import { onMounted } from 'vue';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'vue-input-otp';
import { useRoute } from 'vue-router';
import { useForm } from 'vee-validate';

import { LoadingButton } from '@/components/shared';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { useResendVerificationEmail, useVerifyEmail } from '@/hooks/useAuth';
import { useCountdown } from '@/hooks/useCountdown';
import { useAuthStore } from '@/stores/auth.store';
import { createAuthTypedForm } from '@/utils/formUtils';

import { AuthWrapper } from '../shared/wrappers';
import { type VerifyEmailData, verifyEmailSchema } from './schema';

const router = useRoute();

const token = (router.query.token as string) || '';

const TypedFormField = createAuthTypedForm<VerifyEmailData>();

const { user } = useAuthStore();
const { isCounting, formattedTime, start, stop } = useCountdown(60);

const { handleSubmit, meta, isSubmitting } = useForm<VerifyEmailData>({
  validationSchema: verifyEmailSchema,
  initialValues: {
    otp: token
  }
});

onMounted(() => {
  start();
});

const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmail();
const { mutate: resendEmail, isPending: isResending } = useResendVerificationEmail();

const onSubmit = handleSubmit((values) => {
  verifyEmail(
    {
      token: values.otp
    },
    {
      onSuccess: () => {
        stop();
      }
    }
  );
});

function handleResendEmail() {
  resendEmail(
    {
      email: user?.email || ''
    },
    {
      onSuccess: () => {
        start();
      }
    }
  );
}
</script>

<template>
  <AuthWrapper
    page="verify_email"
    :onSubmit="onSubmit"
    :isValid="meta.valid"
    :isLoading="isSubmitting || isVerifying || isResending"
  >
    <div class="w-full flex flex-col gap-2">
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

      <div class="flex items-center gap-2">
        <p>Didn't receive the email?</p>
        <LoadingButton
          variant="link"
          :disabled="isCounting"
          :isLoading="isResending"
          @click="handleResendEmail"
          class="text-primary-90 hover:text-primary-90/80 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed p-0 size-fit hover:bg-transparent"
          loaderClass="size-3.5"
        >
          Resend email
          <span v-if="isCounting">in {{ formattedTime }}</span>
        </LoadingButton>
      </div>
    </div>
  </AuthWrapper>
</template>
