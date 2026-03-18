<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

interface Props {
  items: { value: string; trigger: string; content: string }[];
  classNames?: {
    wrapper?: string;
    item?: string;
    trigger?: string;
    content?: string;
  };
}

defineProps<Props>();
</script>

<template>
  <Accordion
    collapsible
    type="single"
    :class="cn(classNames?.wrapper)"
  >
    <AccordionItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :class="cn(classNames?.item)"
    >
      <AccordionTrigger :class="cn(classNames?.trigger)">{{ item.trigger }}</AccordionTrigger>
      <AccordionContent :class="cn(classNames?.content)">{{ item.content }}</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
