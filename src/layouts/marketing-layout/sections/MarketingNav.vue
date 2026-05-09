<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Menu } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
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
      >
        Get Started
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          class="md:hidden"
        >
          <Menu
            className="size-5"
            aria-label="Open menu"
            color="var(--color-primary-100)"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          class="w-93.75 max-w-[calc(100vw-32px)] pt-5.75 pb-8 px-4 rounded-4xl shadow-[0px_4px_250px_0px_#0000004D] border-none bg-white mt-9 -mr-4"
        >
          <DropdownMenuGroup className="flex flex-col gap-3">
            <DropdownMenuItem
              className="w-full h-12.5 flex items-center justify-center rounded-full py-3 px-4 bg-primary-100 text-sm font-medium leading-[100%] text-white cursor-pointer"
            >
              Get Started
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>
