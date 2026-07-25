<!-- components/common/DataTablePagination.vue -->
<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

withDefaults(
  defineProps<{
    total: number
    itemsPerPage?: number
    page: number
    siblingCount?: number
  }>(),
  {
    itemsPerPage: 10,
    siblingCount: 1,
  }
)

const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()
</script>

<template>
  <Pagination
    :total="total"
    :items-per-page="itemsPerPage"
    :page="page"
    :sibling-count="siblingCount"
    show-edges
    @update:page="(p) => emit('update:page', p)"
    v-slot="{ page: currentPage }"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationFirst />
      <PaginationPrevious />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === currentPage"
        >
          {{ item.value }}
        </PaginationItem>

        <PaginationEllipsis v-else />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationContent>
  </Pagination>
</template>