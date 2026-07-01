<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import { useForm } from 'vee-validate';

import { Checkbox } from '@/components/ui/checkbox';
import { useAuthStore } from '@/stores/auth.store';
import { createAuthTypedForm } from '@/utils/formUtils';

import { AuthInput, AuthPasswordInput } from '../shared/components';
import { AuthWrapper } from '../shared/wrappers';
import { type SignInData, signInSchema } from './schema';

const TypedFormField = createAuthTypedForm<SignInData>();

const { handleSubmit, meta, isSubmitting } = useForm<SignInData>({
  validationSchema: signInSchema
});

const { signIn } = useAuthStore();

const { mutate, isPending } = signIn;

const onSubmit = handleSubmit((values) => {
  mutate({
    email: values.email,
    password: values.password,
    rememberMe: values.rememberMe
  });
});
</script>

<template>
  <AuthWrapper
    page="sign_in"
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

    <TypedFormField
      name="password"
      label="Password"
    >
      <template #default="fieldProps">
        <AuthPasswordInput v-bind="fieldProps" />
      </template>
    </TypedFormField>

    <div class="flex items-center justify-between">
      <TypedFormField
        name="rememberMe"
        label="Remember me"
        :class-names="{
          item: 'flex-row-reverse items-center',
          label: 'text-[26px]!'
        }"
      >
        <template #default="fieldProps">
          <Checkbox
            :checked="fieldProps.value === true"
            @update:checked="fieldProps.onChange"
            class="size-7.25 rounded-[8px] border-[#E5E5E5] hover:border-primary-90"
          >
            <Check class="size-5.5" />
          </Checkbox>
        </template>
      </TypedFormField>

      <router-link
        to="/auth/forgot-password"
        class="text-[27px] leading-7.25 text-[#D22109] -tracking-[2%]"
      >
        Forgot password?
      </router-link>
    </div>
  </AuthWrapper>
</template>
