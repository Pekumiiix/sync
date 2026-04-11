<script setup lang="ts">
import { useField, useForm } from 'vee-validate';

import { SettingsSwitch } from '../components';
import {
  type BookmarkManagementData,
  bookmarkManagementSchema
} from '../schemas/bookmark-management.schema';
import { SettingsSubSectionWrapper, SettingsWrapper } from '../wrappers';

const { handleSubmit, meta, resetForm, isSubmitting } = useForm<BookmarkManagementData>({
  validationSchema: bookmarkManagementSchema,
  initialValues: {
    autoMergeBookmarks: false
  }
});

const { value: autoMerge } = useField<boolean>('autoMergeBookmarks');
</script>

<template>
  <SettingsWrapper
    title="Bookmark management"
    description="Bookmark management"
    :isDirty="meta.dirty"
    :is-loading="isSubmitting"
    @cancel="resetForm()"
    @save="handleSubmit(() => {})()"
  >
    <SettingsSubSectionWrapper
      title="Auto merge duplicate"
      description="Auto merge duplicate"
      class="pt-0! border-none"
    >
      <SettingsSwitch v-model="autoMerge" />
    </SettingsSubSectionWrapper>
  </SettingsWrapper>
</template>
