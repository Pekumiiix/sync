<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <main class="container w-full min-h-screen flex flex-row">
    <RouterView />

    <div class="basis-1/2 flex flex-col justify-center gap-52.75 pl-30 pt-35.25 bg-[#130E26]">
      <div class="flex flex-col gap-4.25 pr-30">
        <p class="text-[50px] leading-15.25 font-semibold -tracking-[1px] text-white">
          Smarter Saving & Sharing
        </p>
        <p class="text-[28px] leading-10.5 text-white">
          Save more than just bookmarks—organize, access, and share your favorite links
          effortlessly, all in one smart and convenient place.
        </p>
      </div>

      <div class="w-full flex justify-end">
        <img
          src="/images/auth/desktop-bg.png"
          alt="Dashboard preview"
          class="w-full h-auto"
        />
      </div>
    </div>
  </main>
</template>
