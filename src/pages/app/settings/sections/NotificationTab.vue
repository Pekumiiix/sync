<script setup lang="ts">
import { useField, useForm } from 'vee-validate';

import { SettingsSwitch } from '../components';
import { type NotificationData, notificationSchema } from '../schemas/notification.schema';
import { SettingsSubSectionWrapper, SettingsWrapper } from '../wrappers';

const { handleSubmit, meta, resetForm, isSubmitting } = useForm<NotificationData>({
  validationSchema: notificationSchema,
  initialValues: {
    notify_on_new_bookmark: false,
    notify_on_new_member: true
  }
});

const { value: notifyOnNewBookmark } = useField<boolean>('notify_on_new_bookmark');
const { value: notifyOnNewMember } = useField<boolean>('notify_on_new_member');
</script>

<template>
  <SettingsWrapper
    title="Notifications"
    description="Manage your notification preferences"
    :isDirty="meta.dirty"
    :is-loading="isSubmitting"
    @cancel="resetForm()"
    @save="handleSubmit(() => {})()"
  >
    <SettingsSubSectionWrapper
      title="New member notifications"
      description="Receive notifications when new members join"
      class="pt-0! border-none"
    >
      <SettingsSwitch v-model="notifyOnNewMember" />
    </SettingsSubSectionWrapper>

    <SettingsSubSectionWrapper
      title="New bookmark notifications"
      description="Receive notifications when new bookmarks are added"
    >
      <SettingsSwitch v-model="notifyOnNewBookmark" />
    </SettingsSubSectionWrapper>
  </SettingsWrapper>
</template>
