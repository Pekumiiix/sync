<script setup lang="ts">
import { ref } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

const showPassword = ref<boolean>(false);
</script>

<template>
  <div
    class="h-12.5 relative flex items-center justify-between py-3.5 px-4.5 rounded-full border border-[#E8E8E8] focus-within:border-primary-90 hover:border-primary-90/70"
  >
    <Input
      :type="showPassword ? 'text' : 'password'"
      class="p-0 border-none outline-none shadow-none rounded-none"
    />
    <Button
      @click="showPassword = !showPassword"
      variant="ghost"
      type="button"
      class="size-5.5 p-0 text-black-70"
    >
      <EyeOff
        v-if="showPassword"
        :size="22"
      />
      <Eye
        v-else
        :size="22"
      />
    </Button>
  </div>
</template>
