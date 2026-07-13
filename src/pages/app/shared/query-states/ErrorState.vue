<script lang="ts" setup>
interface Props {
  code: number;
  title: string;
  message: string;
}

defineProps<Props>();
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="max-w-89.75 w-full h-fit flex flex-col gap-10 py-3">
      <p class="text-[202px] leading-[100%] -tracking-[3%] font-inter text-black-100 font-semibold">
        {{ code }}
      </p>

      <div class="flex flex-col items-center gap-3">
        <p class="text-[32px] font-medium leading-11.75 text-black-90 -tracking-[1%]">
          {{ title }}
        </p>
        <p class="text-2xl text-center text-black-80">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>
