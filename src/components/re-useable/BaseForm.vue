<script setup lang="ts" generic="FormType extends Record<string, unknown>">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

interface Props {
  name: keyof FormType & string;
  label?: string;
  description?: string;
  showMessage?: boolean;
  classNames?: {
    field?: string;
    item?: string;
    label?: string;
    control?: string;
    description?: string;
  };
}

withDefaults(defineProps<Props>(), {
  showMessage: true
});
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    :name="name"
    :class="cn(classNames?.field)"
  >
    <FormItem :class="cn('flex flex-col gap-2 space-y-0', classNames?.item)">
      <FormLabel :class="cn('text-lg leading-6 text-black-90 font-medium', classNames?.label)">{{
        label
      }}</FormLabel>
      <FormControl :class="cn(classNames?.control)">
        <slot v-bind="componentField" />
      </FormControl>
      <FormDescription :class="cn(classNames?.description)">{{ description }}</FormDescription>
      <FormMessage
        v-if="showMessage"
        class="-mt-2"
      />
    </FormItem>
  </FormField>
</template>
