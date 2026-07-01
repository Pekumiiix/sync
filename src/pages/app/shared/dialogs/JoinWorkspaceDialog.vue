<script setup lang="ts">
import { useForm } from 'vee-validate';

import { BaseAvatar, BaseDialog, BasePasswordInput } from '@/components/re-useable';
import { LoadingButton } from '@/components/shared';
import { Button } from '@/components/ui/button';
import type { Invitation as Props } from '@/types/invitation.type';
import { timeAgo } from '@/utils/dateUtils';
import { createTypedForm } from '@/utils/formUtils';

import { FolderThumbnail } from '../components';
import { type JoinWorkspaceData, joinWorkspaceSchema } from '../schemas/join-workspace.schema';

defineProps<Props>();

const { handleSubmit, meta, isSubmitting } = useForm<JoinWorkspaceData>({
  validationSchema: joinWorkspaceSchema,
  initialValues: {
    password: ''
  }
});

const onSubmit = handleSubmit((data: JoinWorkspaceData) => {
  console.log(data);
});

const TypedFormField = createTypedForm<JoinWorkspaceData>();

const displayBool = defineModel<boolean>({ default: false });
</script>

<template>
  <BaseDialog
    v-model="displayBool"
    title="Join Workspace"
    description="Enter the workspace details to join"
    :class-names="{
      content: 'max-w-156.25 w-full flex flex-col gap-6 rounded-[25px] p-0 border-[#292D3233]',
      header: 'sr-only'
    }"
  >
    <div class="px-3">
      <div
        class="w-full h-63 flex flex-col gap-4 items-center justify-center bg-black-100 rounded-[15px] bg-[url('/images/app/placeholders/bg-placeholder.png')] bg-cover bg-center bg-no-repeat"
      >
        <FolderThumbnail
          :images="folder.recentBookmarkImages"
          :class-names="{
            container: 'size-10 rounded-[7px] bg-white p-1 gap-x-1 gap-y-0.5',
            images: { top: 'size-3.5 rounded-[4px]', bottom: 'w-full h-3.5 rounded-[4px]' }
          }"
        />

        <div class="flex flex-col items-center gap-0.5">
          <p class="text-xl font-medium leading-7 text-white">{{ folder.name }} Workspace</p>
          <div class="flex items-center gap-1.5 text-xs text-white-70">
            Invited by
            <div class="flex items-center gap-1 text-white-90">
              <BaseAvatar
                :fallback="inviter.firstName + ' ' + inviter.lastName"
                :src="inviter.avatarUrl"
                class="size-3"
              />

              {{ inviter.firstName }} {{ inviter.lastName }}
            </div>
            <span class="size-1 rounded-full bg-white-70" /> {{ timeAgo(createdAt) }}
          </div>
        </div>
      </div>
    </div>

    <form
      @submit="onSubmit"
      class="w-full flex flex-col gap-6"
    >
      <TypedFormField
        name="password"
        label="Password"
        :classNames="{
          item: 'px-3'
        }"
      >
        <template #default="fieldProps">
          <BasePasswordInput v-bind="fieldProps" />
        </template>
      </TypedFormField>

      <div class="w-full grid grid-cols-2 gap-3 p-6 border-t border-stroke-1/10">
        <Button
          @click="displayBool = false"
          type="button"
          variant="ghost"
          class="w-full h-12 rounded-full py-3.75 px-6 bg-[#F8F8F9] text-sm font-inter-tight font-medium text-black-100"
        >
          Cancel
        </Button>

        <LoadingButton
          :isLoading="isSubmitting"
          :disabled="!meta.valid"
          class="w-full h-12 rounded-full py-3.75 px-6 text-sm font-inter-tight font-medium"
        >
          <span>Join Workspace</span>
        </LoadingButton>
      </div>
    </form>
  </BaseDialog>
</template>
