<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  description: string;
  confirm: { label: string; action: () => void };
  cancel: { label: string; action: () => void };
  classNames?: {
    trigger?: string;
    content?: string;
    header?: string;
    title?: string;
    description?: string;
    footer?: string;
    cancel?: string;
    confirm?: string;
  };
}

defineProps<Props>();

const displayBool = defineModel<boolean>({ default: false });
</script>

<template>
  <AlertDialog v-model:open="displayBool">
    <AlertDialogTrigger as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogContent :class="cn('shadow-[0px_4px_215px_0px_#00000026]', classNames?.content)">
      <slot />

      <AlertDialogHeader :class="cn(classNames?.header)">
        <AlertDialogTitle :class="cn(classNames?.title)">{{ title }}</AlertDialogTitle>
        <AlertDialogDescription :class="cn(classNames?.description)">{{
          description
        }}</AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter :class="cn(classNames?.footer)">
        <AlertDialogCancel
          :class="cn(classNames?.cancel)"
          @click="cancel.action"
          >{{ cancel.label }}</AlertDialogCancel
        >
        <AlertDialogAction
          :class="cn(classNames?.confirm)"
          @click="confirm.action"
          >{{ confirm.label }}</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
