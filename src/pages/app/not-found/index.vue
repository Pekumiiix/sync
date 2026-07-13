<script setup lang="ts">
import { ErrorState } from '../shared/query-states';
</script>

<template>
  <ErrorState
    :code="404"
    title="Looks Like You’re Lost"
    message="This page took a different route. Head back home or explore the rest of the site"
  />
</template>
