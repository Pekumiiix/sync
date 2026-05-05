<script setup lang="ts">
import { Button } from '@/components/ui/button';
</script>

<template>
  <div class="basis-1/2 flex flex-col gap-52.75 py-35.25 px-8.75">
    <div class="flex flex-col gap-9">
      <img
        src="/images/logo.png"
        alt="Sync"
        class="size-16.75"
      />

      <p class="text-[31px] font-bold leading-[100%] -tracking-[2%] text-black-100">
        Welcome back 👋
      </p>
    </div>

    <form class="w-full flex flex-col items-center gap-16.75">
      <div class="w-full flex flex-col gap-8">
        <Button class="w-full py-8.25 rounded-full text-[29px] leading-8.25">Sign In</Button>

        <div class="flex items-center gap-5">
          <div class="max-w-69 w-full h-px bg-stroke-1/10" />
          <p
            class="px-5.5 py-1.5 bg-[#F1F5F900] text-[27px] font-medium leading-7 text-black-100 tracking-[8%]"
          >
            OR
          </p>
          <div class="max-w-69 w-full h-px bg-stroke-1/10" />
        </div>

        <Button
          variant="outline"
          class="w-full py-8.25 rounded-full text-[29px] leading-8.25 text-black-100 border-stroke-1/10"
        >
          Continue with Google
        </Button>
      </div>
    </form>

    <div class="w-full flex items-center justify-center gap-1.25">
      <p class="text-[29px] -tracking-[2%]">
        <span class="text-black-60">Don’t have an account?</span> ✨
        <router-link
          to="/signup"
          class="text-black-100"
        >
          Create one
        </router-link>
        ✨
      </p>
    </div>
  </div>
</template>
