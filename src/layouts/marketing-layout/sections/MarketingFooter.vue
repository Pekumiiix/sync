<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
</script>

<template>
  <footer class="w-full flex items-center justify-center py-20 px-4 md:px-15 lg:px-27 bg-[#130E26]">
    <div class="container w-full flex flex-col gap-15.75">
      <div class="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-0">
        <div class="flex flex-col md:flex-row md:items-center gap-4.5">
          <div class="size-15 bg-primary-20 rounded-[9px] flex items-center justify-center">
            <img
              src="/images/landing-page/footer/mail.png"
              alt="Mail"
              class="w-7.25 h-5"
            />
          </div>

          <div class="flex flex-col gap-1 opacity-80">
            <h4 class="text-2xl leading-7.5 -tracking-[1%] font-semibold text-white">
              Subscribe Our Newsletter
            </h4>
            <p class="text-xl leading-[160%] text-white-90">
              We‘ll Send you a nice letter once per week. No spam
            </p>
          </div>
        </div>

        <div
          class="w-fit h-15 rounded-full py-3.25 pl-5 pr-2 flex items-center gap-5 border border-primary-100 bg-white"
        >
          <Input
            placeholder="Enter your email"
            class="w-50 h-full rounded-none p-0 text-sm leading-6 placeholder:text-black-80 text-black-100 -tracking-[1%] border-none focus-visible:ring-0 shadow-none"
          />

          <Button class="w-32.75 h-12 py-3.25 px-7.5 rounded-full text-sm font-medium leading-6"
            >Subscribe</Button
          >
        </div>
      </div>

      <div class="w-full h-0.5 bg-black-80" />

      <div class="w-full flex flex-col md:flex-row md:items-center justify-between gap-9.5">
        <div class="flex items-center gap-12">
          <router-link
            to="#"
            class="text-white-90 leading-6 -tracking-[1%]"
            >Contact</router-link
          >
          <router-link
            to="#"
            class="text-white-90 leading-6 -tracking-[1%]"
            >Pricing</router-link
          >
        </div>

        <router-link to="#">
          <img
            src="/images/landing-page/footer/twitter.png"
            alt="Twitter"
            class="size-7.5 rounded-full"
          />
        </router-link>
      </div>
    </div>
  </footer>
</template>
