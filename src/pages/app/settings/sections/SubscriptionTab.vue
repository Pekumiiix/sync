<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { LoadingButton } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { useCancelSubscription } from '@/hooks/useBilling';
import { useAuthStore } from '@/stores/auth.store';

import { SettingsSubSectionWrapper, SettingsWrapper } from '../wrappers';

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);
const { mutate: cancelSubscription, isPending: isCanceling } = useCancelSubscription();

const isOnFreePlan = computed(() => user.value?.subscription.plan === 'free');

function handleCancel() {
  cancelSubscription();
}
</script>

<template>
  <SettingsWrapper
    title="Subscription"
    description="Manage your plan"
  >
    <SettingsSubSectionWrapper
      title="Current Plan"
      description="View and manage your active subscription tier"
      class="border-none pt-0!"
    >
      <div class="max-w-139 w-full flex flex-col gap-6">
        <div
          class="flex items-center justify-between p-5 border border-black-10 rounded-xl bg-slate-50"
        >
          <div>
            <h3 class="text-[15px] font-semibold text-slate-900">
              <span class="capitalize">{{ user?.subscription.plan }}</span> plan
            </h3>
            <p class="text-[13px] text-slate-500 mt-0.5">
              Upgrade for additional features and benefits.
            </p>
          </div>

          <Button
            v-if="isOnFreePlan"
            as-child
            class="bg-primary-100 hover:bg-primary-110 text-white rounded-full px-6"
          >
            <router-link :to="{ name: 'Pricing' }">Upgrade plan</router-link>
          </Button>
          <p
            v-if="user?.subscription.isActive"
            class="px-4 py-1.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full"
          >
            Active
          </p>
        </div>
      </div>
    </SettingsSubSectionWrapper>

    <SettingsSubSectionWrapper
      v-if="user?.subscription.isActive"
      title="Danger Zone"
      description="Destructive actions for your subscription"
      class="border-t border-black-10 pt-8"
    >
      <div class="max-w-139 w-full">
        <div
          class="flex items-center justify-between p-5 border border-red-100 rounded-xl bg-red-50/50"
        >
          <div class="flex flex-col pr-4">
            <h3 class="text-[15px] font-medium text-red-900">Cancel Subscription</h3>
            <p class="text-[13px] text-red-600/80 mt-0.5">
              Your plan will remain active until the end of the current billing period.
            </p>
          </div>

          <LoadingButton
            :isLoading="isCanceling"
            variant="destructive"
            class="shrink-0 rounded-full"
            @click="handleCancel"
          >
            Cancel plan
          </LoadingButton>
        </div>
      </div>
    </SettingsSubSectionWrapper>
  </SettingsWrapper>
</template>
