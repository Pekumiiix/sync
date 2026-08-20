<script setup lang="ts">
import { useForm } from 'vee-validate';

import { BaseAvatar, BaseDialog, BasePasswordInput } from '@/components/re-useable';
import { LoadingButton } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { useAcceptInvitation } from '@/hooks/useInvitation';
import { useAuthStore } from '@/stores/auth.store';
import type { Invitation } from '@/types/invitation.type';
import { timeAgo } from '@/utils/dateUtils';
import { createTypedForm } from '@/utils/formUtils';
import { computeUserName } from '@/utils/stringutils';

import { FolderThumbnail } from '../components';
import { type JoinWorkspaceData, joinWorkspaceSchema } from '../schemas/join-workspace.schema';

const props = defineProps<{
  invitation: Invitation;
}>();

const displayBool = defineModel<boolean>({ default: false });

const { mutate: acceptInvitation, isPending: isAcceptingInvitation } = useAcceptInvitation();

const { handleSubmit, meta, isSubmitting, setErrors } = useForm<JoinWorkspaceData>({
  validationSchema: joinWorkspaceSchema,
  initialValues: {
    password: ''
  }
});

const onSubmit = handleSubmit((data: JoinWorkspaceData) => {
  acceptInvitation(
    { ...data, token: props.invitation.token },
    {
      onSuccess: () => {
        displayBool.value = false;
      },
      onError: (error) => {
        setErrors({ password: error.message });
      }
    }
  );
});

const TypedFormField = createTypedForm<JoinWorkspaceData>();

const authStore = useAuthStore();
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
          :images="invitation.folder.recentBookmarkImages"
          :class-names="{
            container: 'size-10 rounded-[7px] bg-white p-1 gap-x-1 gap-y-0.5',
            images: { top: 'size-3.5 rounded-[4px]', bottom: 'w-full h-3.5 rounded-[4px]' }
          }"
        />

        <div class="flex flex-col items-center gap-0.5">
          <p class="text-xl font-medium leading-7 text-white">
            {{ invitation.folder.name }} Workspace
          </p>
          <div class="flex items-center gap-1.5 text-xs text-white-70">
            Invited by
            <div class="flex items-center gap-1 text-white-90">
              <BaseAvatar
                :fallback="
                  computeUserName(invitation.inviter.firstName, invitation.inviter.lastName)
                "
                :src="invitation.inviter.avatarUrl"
                class="size-3 [&>span]:text-[6px]"
              />

              {{ computeUserName(invitation.inviter.firstName, invitation.inviter.lastName) }}
            </div>
            <span class="size-1 rounded-full bg-white-70" /> {{ timeAgo(invitation.createdAt) }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="authStore.user?.subscription.plan === 'free'"
      class="w-full flex items-center justify-between py-5 px-4 rounded-2xl bg-[#F0EDFE4D] border border-primary-10"
    >
      <div class="flex items-center gap-3">
        <img
          src="/images/app/dialogs/locked.png"
          alt="lock"
          class="size-13.5"
        />
        <div class="w-88 flex flex-col gap-0.5">
          <p class="text-lg font-medium text-black-90 leading-[100%]">
            This workspace requires a paid plan
          </p>
          <p class="text-sm leading-9.5 text-black-70">
            To join {{ props.invitation.folder.name }}, you need to subscribe to a paid plan, Click
            ‘View Plans’ to see available options.
          </p>
        </div>
      </div>

      <Button
        as-child
        class="w-fit h-9.5 py-3 px-4 rounded-full text-xs font-medium"
      >
        <router-link :to="{ name: 'Pricing' }">View plans</router-link>
      </Button>
    </div>

    <form
      v-else
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
          class="w-full h-12 rounded-full py-3.75 px-6 bg-contemporary-background text-sm font-inter-tight font-medium text-black-100"
        >
          Cancel
        </Button>

        <LoadingButton
          :isLoading="isSubmitting || isAcceptingInvitation"
          :disabled="!meta.valid"
          class="w-full h-12 rounded-full py-3.75 px-6 text-sm font-inter-tight font-medium"
        >
          <span>Join Workspace</span>
        </LoadingButton>
      </div>
    </form>
  </BaseDialog>
</template>
