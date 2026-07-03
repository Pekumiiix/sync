<script setup lang="ts">
import { useField, useForm } from 'vee-validate';

import { useUpdateSettings } from '@/hooks/useAccount';
import { useAuthStore } from '@/stores/auth.store';

import { SettingsSwitch } from '../components';
import {
  type BookmarkManagementData,
  bookmarkManagementSchema
} from '../schemas/bookmark-management.schema';
import { SettingsSubSectionWrapper, SettingsWrapper } from '../wrappers';

const { user } = useAuthStore();

const { mutate, isPending } = useUpdateSettings();

const { handleSubmit, meta, resetForm, isSubmitting } = useForm<BookmarkManagementData>({
  validationSchema: bookmarkManagementSchema,
  initialValues: {
    autoMergeBookmarks: user?.settings.autoMergeDuplicate
  }
});

const onSubmit = handleSubmit((values) => {
  mutate({
    autoMergeDuplicate: values.autoMergeBookmarks
  });
});

const { value: autoMerge } = useField<boolean>('autoMergeBookmarks');
</script>

<template>
  <SettingsWrapper
    title="Bookmark management"
    description="Bookmark management"
    :isDirty="meta.dirty"
    :is-loading="isSubmitting || isPending"
    @cancel="resetForm()"
    @save="() => onSubmit()"
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
