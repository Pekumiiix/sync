<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import { useForm } from 'vee-validate';

import { getBrowserImage } from '@/components/constants/browsers';
import { Button } from '@/components/ui/button';
import { timeAgo } from '@/utils/dateUtils';

import { type SyncSettingsData, syncSettingsSchema } from '../schemas/sync-settings.schema';
import { SettingsSubSectionWrapper, SettingsWrapper } from '../wrappers';

const connectedBrowsers = [
  {
    name: 'Google Chrome',
    type: 'chrome',
    connected_at: new Date().toISOString()
  },
  {
    name: 'Mozilla Firefox',
    type: 'firefox',
    connected_at: new Date().toISOString()
  },
  {
    name: 'Microsoft Edge',
    type: 'edge',
    connected_at: new Date().toISOString()
  },
  {
    name: 'Opera',
    type: 'opera',
    connected_at: new Date().toISOString()
  },
  {
    name: 'Arc',
    type: 'arc',
    connected_at: new Date().toISOString()
  },
  {
    name: 'Brave',
    type: 'brave',
    connected_at: new Date().toISOString()
  }
];

const { handleSubmit, values, setFieldValue, meta, resetForm, isSubmitting } =
  useForm<SyncSettingsData>({
    validationSchema: syncSettingsSchema,
    initialValues: {
      syncInterval: '3 hours'
    }
  });
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
          v-for="browser in connectedBrowsers"
          :key="browser.type"
          class="w-full h-14.5 flex items-center justify-between px-4 py-3.25 rounded-full bg-[#F9F9FB]"
        >
          <div class="flex items-center gap-1.75">
            <img
              :src="getBrowserImage(browser.type)"
              :alt="browser.name"
              class="size-8 rounded-full"
            />

            <div class="flex flex-col gap-1">
              <p class="text-sm font-medium text-black-90 leading-4">{{ browser.name }}</p>
              <p class="text-xs leading-[100%] text-black-70">
                Connected {{ timeAgo(browser.connected_at) }}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            class="w-18.25 h-6.75 text-[9px] text-black-90 font-medium leading-9.25 py-1.75 px-3 border-black-30 rounded-full bg-transparent"
          >
            Disconnect
          </Button>
        </div>
      </div>
    </SettingsSubSectionWrapper>

    <SettingsSubSectionWrapper
      title="Sync frequency"
      description="Manage the browsers linked to your account and control where your bookmarks stay synchronized"
      class="flex-col"
    >
      <div class="grid grid-cols-4 gap-3">
        <Button
          class="w-full h-10.5 flex items-center justify-between gap-2 text-xs font-medium leading-5 text-white py-3 px-4 rounded-full bg-black-100 hover:bg-black-90"
        >
          Immediately

          <span
            class="py-0.75 px-1 rounded-full text-[8px] leading-2.5 text-black-100 bg-[linear-gradient(100.67deg,#39F2FF_11.49%,#FF88F9_93.75%)]"
          >
            Go Pro
          </span>
        </Button>

        <Button
          v-for="option in ['3 hours', '6 hours', '12 hours']"
          :key="option"
          @click="setFieldValue('syncInterval', option as SyncSettingsData['syncInterval'])"
          variant="ghost"
          class="w-full h-10.5 flex items-center gap-2 text-xs font-medium leading-5 text-black-90 py-3 px-4 rounded-full bg-[#F9F9FB]"
        >
          Every {{ option }}
          <Check
            v-if="values.syncInterval === option"
            class="text-green-500"
          />
        </Button>
      </div>
    </SettingsSubSectionWrapper>
  </SettingsWrapper>
</template>
