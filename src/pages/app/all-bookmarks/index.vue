<script setup lang="ts">
import { AppWrapper, ContentWrapper } from '../shared';
import { AllBookmarks,PinnedBookmarks } from './sections';
</script>

<template>
  <AppWrapper page="All Bookmarks">
    <ContentWrapper>
      <PinnedBookmarks />

      <AllBookmarks />
    </ContentWrapper>
  </AppWrapper>
</template>
