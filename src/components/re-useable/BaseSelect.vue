<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Props {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: { value: string; label: string }[];
  classNames?: {
    select?: string;
    trigger?: string;
    content?: string;
    item?: string;
    value?: string;
  };
}

defineProps<Props>();

const modelValue = defineModel<string>();
</script>

<template>
  <Select
    v-model="modelValue"
    :class="classNames?.select"
  >
    <SelectTrigger
      :class="cn('border-none text-base cursor-pointer shadow-none', classNames?.trigger)"
    >
      <SelectValue
        :placeholder="placeholder"
        :class="classNames?.value"
      />
    </SelectTrigger>
    <SelectContent
      :class="cn('border-none shadow-[0px_4px_25px_0px_#0000001A]', classNames?.content)"
    >
      <SelectItem
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :class="cn('cursor-pointer', classNames?.item)"
      >
        {{ option.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
