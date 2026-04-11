<script setup lang="ts">
import { BaseSwitch } from '@/components/re-useable';

const checked = defineModel<boolean>();
</script>

<template>
  <BaseSwitch
    v-model="checked"
    class="w-9.75 h-6 flex items-center [&>span]:size-5.25 [&>span]:data-[state=checked]:translate-x-4"
  />
</template>
