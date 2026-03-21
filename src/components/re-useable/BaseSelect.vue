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

const props = defineProps<Props>();

const modelValue = defineModel<string>();

function renderValue(value: string) {
  const val = props.options.find((opt) => opt.value === value)?.label || value;

  return val.charAt(0).toLocaleUpperCase() + val?.slice(1) || props.placeholder;
}
</script>

<template>
  <Select
    v-model="modelValue"
    :class="classNames?.select"
  >
    <SelectTrigger
      :class="
        cn(
          'text-base cursor-pointer shadow-none hover:border-primary-90/70 focus-within:border-primary-90 transition-colors duration-200',
          classNames?.trigger
        )
      "
    >
      <SelectValue
        :placeholder="placeholder"
        :class="classNames?.value"
      >
        {{ renderValue(modelValue || '') }}</SelectValue
      >
    </SelectTrigger>
    <SelectContent
      :class="cn('border-none shadow-[0px_4px_25px_0px_#0000001A] p-0! m-0!', classNames?.content)"
    >
      <SelectItem
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :class="cn('cursor-pointer hover:bg-primary-10!', classNames?.item)"
      >
        <slot
          name="item"
          :option="option"
        >
          {{ option.label }}
        </slot>
      </SelectItem>
    </SelectContent>
  </Select>
</template>
