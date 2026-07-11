<script setup lang="ts">
import { useForm } from 'vee-validate';

import { syncFrequency } from '@/components/constants/sync-frequency';
import { useUpdateSettings } from '@/hooks/useAccount';
import { useGetBrowserIntegrations } from '@/hooks/useBrowserIntegration';
import { useAuthStore } from '@/stores/auth.store';

import { EmptyState } from '../../shared/query-states';
import { QueryStateWrapper } from '../../shared/wrappers';
import { BrowserIntegegrations, FrequencyOptionButton } from '../components';
import { type SyncSettingsData, syncSettingsSchema } from '../schemas/sync-settings.schema';
import { SettingsSubSectionWrapper, SettingsWrapper } from '../wrappers';

const authStore = useAuthStore();

const { data, isLoading } = useGetBrowserIntegrations();
const { mutate, isPending } = useUpdateSettings();

const { handleSubmit, values, setFieldValue, meta, resetForm, isSubmitting } =
  useForm<SyncSettingsData>({
    validationSchema: syncSettingsSchema,
    initialValues: {
      syncInterval: authStore.user?.settings.sync.frequency
    }
  });

const onSubmit = handleSubmit((values) => {
  mutate({
    frequency: values.syncInterval
  });
});

const isUserOnBasicPlan = authStore.user?.plan === 'basic';
</script>

<template>
  <SettingsWrapper
    title="Sync settings"
    description="Control how your bookmarks sync across browsers."
    :isDirty="meta.dirty"
    :is-loading="isSubmitting || isPending || isLoading"
    @cancel="() => resetForm()"
    @save="() => onSubmit()"
  >
    <SettingsSubSectionWrapper
      title="Browsers connected"
      description="Manage the browsers linked to your account"
      class="pt-0! flex-col border-t-0!"
    >
      <QueryStateWrapper
        :is-loading="isLoading"
        :is-empty="!data?.data.integrations.length"
        empty-title="You currently have no connected browsers"
        loading-title="Loading your connected browsers"
      >
        <div class="w-full flex flex-col gap-5">
          <BrowserIntegegrations
            :integrations="data?.data.integrations"
            :isLoading="isLoading"
          />
        </div>

        <template #empty>
          <EmptyState
            class="rounded-[12px] border border-white-90"
            title="You have no browsers linked to your account at this moment"
          >
            <router-link
              to="#"
              class="text-sm leading-4 font-medium font-dm-sans underline text-black-100 underline-offset-2"
            >
              Add a new browser here
            </router-link>
          </EmptyState>
        </template>
      </QueryStateWrapper>
    </SettingsSubSectionWrapper>

    <SettingsSubSectionWrapper
      title="Sync frequency"
      description="Manage the browsers linked to your account and control where your bookmarks stay synchronized"
      class="flex-col"
    >
      <div class="grid grid-cols-4 gap-3">
        <FrequencyOptionButton
          :isSelected="values.syncInterval === 'immediate'"
          :disabled="!isUserOnBasicPlan"
          @click="setFieldValue('syncInterval', 'immediate')"
          class="bg-black-100 hover:bg-black-90 text-white"
        >
          Immediately
          <span
            v-if="!isUserOnBasicPlan"
            class="py-0.75 px-1 rounded-full text-[8px] leading-2.5 text-black-100 bg-[linear-gradient(100.67deg,#39F2FF_11.49%,#FF88F9_93.75%)]"
          >
            Go Basic
          </span>
        </FrequencyOptionButton>

        <FrequencyOptionButton
          v-for="option in syncFrequency.slice(1)"
          :key="option.value"
          :isSelected="values.syncInterval === option.value"
          @click="setFieldValue('syncInterval', option.value)"
          class="bg-[#F9F9FB] text-black-90"
          variant="ghost"
        >
          {{ option.label }}
        </FrequencyOptionButton>
      </div>
    </SettingsSubSectionWrapper>
  </SettingsWrapper>
</template>
