<script setup lang="ts">
import { useForm } from 'vee-validate';

import { syncFrequency } from '@/components/constants/sync-frequency';
import { useGetBrowserIntegrations } from '@/hooks/useBrowserIntegration';
import { useSettingsStore } from '@/stores/settings.store';

import { BrowserIntegegrations, FrequencyOptionButton } from '../components';
import { type SyncSettingsData, syncSettingsSchema } from '../schemas/sync-settings.schema';
import { SettingsSubSectionWrapper, SettingsWrapper } from '../wrappers';

const { settings } = useSettingsStore();

const { data, isLoading } = useGetBrowserIntegrations();

const { handleSubmit, values, setFieldValue, meta, resetForm, isSubmitting } =
  useForm<SyncSettingsData>({
    validationSchema: syncSettingsSchema,
    initialValues: {
      syncInterval: settings.preferences.sync.frequency
    }
  });

const isUserPro = settings.subscription.isPro || false;
</script>

<template>
  <SettingsWrapper
    title="Sync settings"
    description="Control how your bookmarks sync across browsers."
    :isDirty="meta.dirty"
    :is-loading="isSubmitting"
    @cancel="() => resetForm()"
    @save="() => handleSubmit(() => {})()"
  >
    <SettingsSubSectionWrapper
      title="Browsers connected"
      description="Manage the browsers linked to your account"
      class="pt-0! flex-col border-t-0!"
    >
      <div class="w-full flex flex-col gap-5">
        <BrowserIntegegrations
          :integrations="data?.data.integrations"
          :isLoading="isLoading"
        />
      </div>
    </SettingsSubSectionWrapper>

    <SettingsSubSectionWrapper
      title="Sync frequency"
      description="Manage the browsers linked to your account and control where your bookmarks stay synchronized"
      class="flex-col"
    >
      <div class="grid grid-cols-4 gap-3">
        <FrequencyOptionButton
          :isSelected="values.syncInterval === 'immediate'"
          :disabled="!isUserPro"
          @click="setFieldValue('syncInterval', 'immediate')"
          class="bg-black-100 hover:bg-black-90 text-white"
        >
          Immediately
          <span
            v-if="!isUserPro"
            class="py-0.75 px-1 rounded-full text-[8px] leading-2.5 text-black-100 bg-[linear-gradient(100.67deg,#39F2FF_11.49%,#FF88F9_93.75%)]"
          >
            Go Pro
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
