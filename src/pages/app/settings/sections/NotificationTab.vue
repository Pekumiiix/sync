<script setup lang="ts">
import { useField, useForm } from 'vee-validate';

import { useUpdateSettings } from '@/hooks/useAccount';
import { useAuthStore } from '@/stores/auth.store';
import { getChangedValues } from '@/utils/formUtils';

import { SettingsSwitch } from '../components';
import { type NotificationData, notificationSchema } from '../schemas/notification.schema';
import { SettingsSubSectionWrapper, SettingsWrapper } from '../wrappers';

const { user } = useAuthStore();

const { mutate, isPending } = useUpdateSettings();

const { handleSubmit, meta, resetForm, isSubmitting } = useForm<NotificationData>({
  validationSchema: notificationSchema,
  initialValues: {
    notifyOnNewBookmark: user?.settings.notification.notifyOnNewBookmark,
    notifyOnNewMember: user?.settings.notification.notifyOnNewMember
  }
});

const onSubmit = handleSubmit((values) => {
  const initial = meta.value.initialValues as Partial<NotificationData>;

  const payload = getChangedValues(values, initial);

  if (!payload) return;

  mutate(payload.changedValues);
});

const { value: notifyOnNewBookmark } = useField<boolean>('notifyOnNewBookmark');
const { value: notifyOnNewMember } = useField<boolean>('notifyOnNewMember');
</script>

<template>
  <SettingsWrapper
    title="Notifications"
    description="Manage your notification preferences"
    :isDirty="meta.dirty"
    :is-loading="isSubmitting || isPending"
    @cancel="resetForm()"
    @save="() => onSubmit()"
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
