<script setup lang="ts">
import { ref } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Props {
  placeholder?: string;
  classNames?: {
    root?: string;
    input?: string;
    button?: string;
    icon?: string;
  };
  iconSize?: number;
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Enter password',
  iconSize: 22,
  classNames: () => ({
    icon: 'size-5.5'
  })
});

const showPassword = ref<boolean>(false);
</script>

<template>
  <div
    :class="
      cn(
        'h-12.5 relative flex items-center justify-between py-3.5 px-4.5 rounded-full border border-[#E8E8E8] focus-within:border-primary-90 hover:border-primary-90/70 transition-colors duration-200',
        classNames?.root
      )
    "
  >
    <Input
      :type="showPassword ? 'text' : 'password'"
      :class="cn('p-0 border-none outline-none shadow-none rounded-none', classNames?.input)"
      :placeholder="placeholder"
    />

    <Button
      @click="showPassword = !showPassword"
      variant="ghost"
      type="button"
      :class="cn('size-5.5 p-0 text-black-70', classNames?.button)"
    >
      <EyeOff
        v-if="showPassword"
        :class="classNames.icon"
      />
      <Eye
        v-else
        :class="classNames.icon"
      />
    </Button>
  </div>
</template>
