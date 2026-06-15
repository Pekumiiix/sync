<script setup lang="ts">
import { computed } from 'vue';

import { LoadingButton } from '@/components/shared';
import { Button } from '@/components/ui/button';

type AuthPages = 'sign_in' | 'sign_up' | 'forgot_password' | 'reset_password' | 'verify_email';

interface Props {
  page: AuthPages;
  onSubmit: () => void;
  isValid: boolean;
  isLoading?: boolean;
}

interface IPageConfig {
  message: string;
  buttonLabel: string;
  authAlternative?: { text: string; linkText: string; href: string };
}

const props = defineProps<Props>();

const pageConfig: Record<AuthPages, IPageConfig> = {
  sign_in: {
    message: 'Welcome back to Sync 👋',
    buttonLabel: 'Sign In',
    authAlternative: {
      text: "Don't have an account?",
      linkText: 'Create one',
      href: '/auth/sign-up'
    }
  },
  sign_up: {
    message: 'Join Sync and experience seamless bookmark management',
    buttonLabel: 'Create account',
    authAlternative: {
      text: 'Already have an account?',
      linkText: 'Sign in',
      href: '/auth/sign-in'
    }
  },
  forgot_password: {
    message: 'Reset your password and regain access to your account',
    buttonLabel: 'Send reset link'
  },
  reset_password: {
    message: 'Set a new password for your account',
    buttonLabel: 'Reset password'
  },
  verify_email: {
    message: 'Verify your email address to complete your registration',
    buttonLabel: 'Verify email'
  }
};

const isSignInOrSignUp = computed(() => ['sign_in', 'sign_up'].includes(props.page));
</script>

<template>
  <div
    class="max-w-3xl w-full flex flex-col 2xl:justify-center gap-52.75 py-35.25 px-8.75 2xl:pr-15"
  >
    <div class="flex flex-col gap-9">
      <img
        src="/images/logo-2.png"
        alt="Sync"
        class="size-16.75"
      />

      <p class="text-[31px] font-bold leading-[100%] -tracking-[2%] text-black-100">
        {{ pageConfig[page].message }}
      </p>
    </div>

    <form
      @submit="onSubmit"
      class="w-full flex flex-col items-center gap-16.75"
    >
      <div class="w-full flex flex-col gap-8.25">
        <slot />
      </div>

      <div class="w-full flex flex-col gap-8">
        <LoadingButton
          class="w-full py-8.25 rounded-full text-[29px] leading-8.25"
          :isLoading="isLoading"
          :disabled="!isValid"
        >
          <span>{{ pageConfig[page].buttonLabel }}</span>
        </LoadingButton>

        <div
          v-if="isSignInOrSignUp"
          class="flex items-center gap-5"
        >
          <div class="max-w-69 w-full h-px bg-stroke-1/10" />
          <p
            class="px-5.5 py-1.5 bg-[#F1F5F900] text-[27px] font-medium leading-7 text-black-100 tracking-[8%]"
          >
            OR
          </p>
          <div class="max-w-69 w-full h-px bg-stroke-1/10" />
        </div>

        <Button
          v-if="page === 'forgot_password'"
          type="button"
          variant="outline"
          class="w-full flex items-center gap-4 py-8.25 rounded-full text-[29px] leading-8.25 text-black-100 border-stroke-1/10"
        >
          Go back
        </Button>

        <Button
          v-if="isSignInOrSignUp"
          type="button"
          variant="outline"
          class="w-full flex items-center gap-4 py-8.25 rounded-full text-[29px] leading-8.25 text-black-100 border-stroke-1/10"
        >
          <img
            src="/images/auth/google.png"
            alt="Google"
            class="size-10.25"
          />
          Continue with Google
        </Button>
      </div>
    </form>

    <div
      v-if="isSignInOrSignUp"
      class="w-full flex items-center justify-center gap-1.25"
    >
      <p class="text-[29px] -tracking-[2%] leading-[100%]">
        <span class="text-black-60">{{ pageConfig[page].authAlternative?.text }}</span> ✨
        <router-link
          :to="pageConfig[page].authAlternative?.href || '#'"
          class="text-black-100"
        >
          {{ pageConfig[page].authAlternative?.linkText }}
        </router-link>
        ✨
      </p>
    </div>
  </div>
</template>
