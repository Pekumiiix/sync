<script setup lang="ts">
import type { Component } from 'vue';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface Props {
  orientation: 'horizontal' | 'vertical';
  tabs: {
    value: string;
    label: string | Component;
    element: Component;
  }[];
  classNames?: {
    tab?: string;
    tabList?: string;
    tabTrigger?: string;
    content?: string;
  };
}

defineProps<Props>();

const modelValue = defineModel<string>();
</script>

<template>
  <Tabs
    v-model="modelValue"
    :orientation="orientation"
    :class="cn(classNames?.tab)"
  >
    <TabsList :class="cn(classNames?.tabList)">
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        :class="cn(classNames?.tabTrigger)"
      >
        <template v-if="typeof tab.label === 'string'">
          {{ tab.label }}
        </template>

        <template v-else>
          <component :is="tab.label" />
        </template>
      </TabsTrigger>
    </TabsList>

    <TabsContent
      v-for="tab in tabs"
      :key="tab.value"
      :value="tab.value"
      :class="cn(classNames?.content)"
    >
      <component :is="tab.element" />
    </TabsContent>
  </Tabs>
</template>
