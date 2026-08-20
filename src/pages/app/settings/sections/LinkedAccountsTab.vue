<script setup lang="ts">
import { useOAuthIdentities } from '@/hooks/useAccount';

import { QueryStateWrapper } from '../../shared/wrappers';
import { LinkedAccountItems } from '../components';
import { SettingsWrapper } from '../wrappers';

const { data, isLoading, isError, refetch } = useOAuthIdentities();
</script>

<template>
  <SettingsWrapper
    title="Linked Accounts"
    description="Manage your linked accounts"
  >
    <QueryStateWrapper
      :is-loading="isLoading"
      :is-error="isError"
      :is-empty="!data?.data.identities.length"
      empty-title="You currently have no connected accounts"
      loading-title="Loading your connected accounts"
      error-title="Failed to load linked accounts"
      error-message="There was an issue fetching your linked accounts. Please try again."
      @retry="refetch"
    >
      <LinkedAccountItems
        v-for="oauthIdentity in data?.data.identities || []"
        :key="oauthIdentity.id"
        :oauthIdentity="oauthIdentity"
      />
    </QueryStateWrapper>
  </SettingsWrapper>
</template>
