<script setup lang="ts">
import { getOAuthConfig } from '@/components/constants/oauths';
import { LoadingButton } from '@/components/shared';
import { useDisconnectOAuthIdentity } from '@/hooks/useAccount';
import type { IOAuthIdentity } from '@/types/account.type';
import { timeAgo } from '@/utils/dateUtils';

const props = defineProps<{
  oauthIdentity: IOAuthIdentity;
}>();

const { mutate, isPending } = useDisconnectOAuthIdentity();

function handleDisconnectOAuthIdentity() {
  mutate({ provider: props.oauthIdentity.provider });
}
</script>

<template>
  <div
    class="w-full h-14.5 flex items-center justify-between px-4 py-3.25 rounded-full bg-[#F9F9FB]"
  >
    <div class="flex items-center gap-1.75">
      <img
        :src="getOAuthConfig(oauthIdentity.provider).icon"
        :alt="oauthIdentity.provider"
        class="size-8 rounded-full"
      />

      <div class="flex flex-col gap-1">
        <p class="text-sm font-medium text-black-90 leading-4">
          {{ getOAuthConfig(oauthIdentity.provider).name }} account
        </p>
        <p
          v-if="oauthIdentity.createdAt"
          class="text-xs leading-[100%] text-black-70"
        >
          Connected {{ timeAgo(oauthIdentity.createdAt) }}
        </p>
      </div>
    </div>

    <LoadingButton
      :isLoading="isPending"
      @click="() => handleDisconnectOAuthIdentity()"
      variant="outline"
      class="w-18.25 h-6.75 text-[9px] text-black-90 font-medium leading-9.25 py-1.75 px-3 border-black-30 rounded-full bg-transparent"
      loader-class="size-4"
    >
      <span>Disconnect</span>
    </LoadingButton>
  </div>
</template>
