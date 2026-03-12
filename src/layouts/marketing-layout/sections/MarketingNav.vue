<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Menu } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
</script>

<template>
  <nav
    class="container w-full flex items-center justify-between p-5 rounded-full bg-secondary shadow-[0px_4px_50px_0px_#B5A5FF69]"
  >
    <router-link
      to="/"
      class="flex items-center gap-1"
    >
      <img
        src="/images/logo.png"
        alt="Logo"
        class="size-7 md:size-8"
      />
      <p
        class="text-[21px] md:text-2xl leading-[100%] font-semibold text-primary-100 font-instrument-sans"
      >
        SYNC
      </p>
    </router-link>

    <div class="flex items-center gap-3">
      <router-link
        to="/pricing"
        class="text-lg font-medium font-inter-tight leading-5 text-black-90 hover:text-primary-100 transition-colors duration-300"
        active-class="text-lg font-medium font-inter-tight leading-5 text-primary-100 hover:text-primary-100 transition-colors duration-300"
      >
        Pricing
      </router-link>

      <div class="h-10 w-0.5 shrink-0 bg-[#0000000F]" />

      <Button
        class="hidden md:flex h-11.75 py-4 px-6 rounded-[30px] text-xs font-semibold leading-[100%] font-instrument-sans"
        >Get Started</Button
      >

      <Button class="flex md:hidden size-fit! p-1! bg-transparent hover:bg-white-90">
        <Menu
          color="var(--color-primary-100)"
          class="shrink-0 size-8"
        />
      </Button>
    </div>
  </nav>
</template>
