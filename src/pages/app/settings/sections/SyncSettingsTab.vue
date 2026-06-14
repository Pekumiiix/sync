<script setup lang="ts">
import { useForm } from 'vee-validate';

import { getBrowserImage } from '@/components/constants/browsers';
import { syncFrequency } from '@/components/constants/sync-frequency';
import { LoadingButton } from '@/components/shared';
import { useSettings } from '@/contexts/useSettings';
import { timeAgo } from '@/utils/dateUtils';

import { FrequencyOptionButton } from '../components';
import { type SyncSettingsData, syncSettingsSchema } from '../schemas/sync-settings.schema';
import { SettingsSubSectionWrapper, SettingsWrapper } from '../wrappers';

const { settings } = useSettings();

const { handleSubmit, values, setFieldValue, meta, resetForm, isSubmitting } =
  useForm<SyncSettingsData>({
    validationSchema: syncSettingsSchema,
    initialValues: {
      syncInterval: settings.value?.preferences.sync.frequency
    }
  });

const isUserPro = settings.value?.subscription.isPro || false;
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
        <div
          v-for="browser in settings?.connections || []"
          :key="browser.provider"
          class="w-full h-14.5 flex items-center justify-between px-4 py-3.25 rounded-full bg-[#F9F9FB]"
        >
          <div class="flex items-center gap-1.75">
            <img
              :src="getBrowserImage(browser.provider)"
              :alt="browser.name"
              class="size-8 rounded-full"
            />

            <div class="flex flex-col gap-1">
              <p class="text-sm font-medium text-black-90 leading-4">{{ browser.name }}</p>
              <p
                v-if="browser.connectedAt"
                class="text-xs leading-[100%] text-black-70"
              >
                Connected {{ timeAgo(browser.connectedAt) }}
              </p>
            </div>
          </div>

          <LoadingButton
            :isLoading="false"
            variant="outline"
            class="w-18.25 h-6.75 text-[9px] text-black-90 font-medium leading-9.25 py-1.75 px-3 border-black-30 rounded-full bg-transparent"
            loader-class="size-4"
          >
            <span>{{ browser.isConnected ? 'Disconnect' : 'Connect' }}</span>
          </LoadingButton>
        </div>
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
