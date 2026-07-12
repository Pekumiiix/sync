<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';

import { LinkIcon } from '@/components/icons';
import { BaseSelect } from '@/components/re-useable';
import { LoadingButton } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import env from '@/config/env';
import { useClipboard } from '@/hooks/useClipboard';
import { useCreateInvitation } from '@/hooks/useInvitation';
import { useGetFolderMembers } from '@/hooks/useMember';
import { createTypedForm } from '@/utils/formUtils';

import { MembersItem } from '../components';
import { type ShareBookmarkData, shareBookmarkSchema } from '../schemas/share-bookmark.schema';
import { ActionDialogWrapper, QueryStateWrapper } from '../wrappers';
import { AddPasswordDialog } from '.';

interface Props {
  folderId: string;
  isProtected: boolean;
}

const props = defineProps<Props>();

const { copy, hasCopied } = useClipboard();

const {
  data: folderMembersData,
  isLoading: isFolderMembersLoading,
  isError: isFolderMembersError,
  refetch: refetchFolderMembers
} = useGetFolderMembers(() => ({
  folderId: props.folderId
}));
const { mutate: createInvitation, isPending: isCreatingInvitation } = useCreateInvitation();

const { handleSubmit, meta, isSubmitting } = useForm<ShareBookmarkData>({
  validationSchema: shareBookmarkSchema,
  initialValues: {
    email: '',
    accessLevel: 'editor'
  }
});

const onSubmit = handleSubmit(async (values) => {
  createInvitation({
    folderId: props.folderId,
    email: values.email,
    accessLevel: values.accessLevel
  });
});

const TypedFormField = createTypedForm<ShareBookmarkData>();

const showAddPasswordDialog = ref(false);

const displayBool = defineModel<boolean>({ default: false });
</script>

<template>
  <ActionDialogWrapper
    v-model="displayBool"
    title="Invite collaborators"
    description="Share access with teammates or collaborators"
  >
    <div class="flex flex-col gap-1 px-6 pt-4.5">
      <div
        class="w-full flex items-center justify-between py-5 px-4 rounded-[14px] border border-primary-10 bg-[#F0EDFE4D]"
      >
        <div class="flex items-center gap-2">
          <div class="size-10.5 flex items-center justify-center rounded-full bg-primary-100">
            <LinkIcon class="fill-white size-4.5" />
          </div>

          <div class="flex flex-col gap-0.5">
            <p class="text-lg font-medium text-black-90 leading-[100%]">Sharable link</p>
            <p class="text-sm leading-4.5">Copy link to share publicly</p>
          </div>
        </div>

        <Button
          @click="copy(`${env.frontendUrl}/app/all-bookmarks?invite_token=${new Date().getTime()}`)"
          :disabled="hasCopied"
          variant="outline"
          class="w-21.25 h-9.5 text-xs font-medium leading-[100%] py-3 px-4 rounded-full bg-white border-stroke-1/10"
        >
          {{ hasCopied ? 'Link copied' : 'Copy link' }}
        </Button>
      </div>

      <form
        @submit="onSubmit"
        class="flex items-center gap-2.5 pt-5"
      >
        <div
          class="w-full h-10.5 flex items-center justify-between p-1 pl-4 outline-2 outline-[#E8E8E8] rounded-full"
        >
          <TypedFormField
            name="email"
            :class-names="{ item: 'w-full' }"
          >
            <template #default="fieldProps">
              <Input
                v-bind="fieldProps"
                placeholder="Enter email..."
                class="text-xs leading-[100%] placeholder:text-black-70 p-0 border-none rounded-none"
              />
            </template>
          </TypedFormField>

          <TypedFormField name="accessLevel">
            <template #default="fieldProps">
              <BaseSelect
                v-bind="fieldProps"
                :options="[
                  { value: 'editor', label: 'Can edit' },
                  { value: 'viewer', label: 'Can view' }
                ]"
                :class-names="{
                  trigger:
                    'rounded-full p-3 border-none text-xs font-medium text-black-90 bg-[#F9F9Fa]'
                }"
              />
            </template>
          </TypedFormField>
        </div>

        <LoadingButton
          :isLoading="isSubmitting || isCreatingInvitation"
          :disabled="isSubmitting || !meta.valid || isCreatingInvitation"
          class="w-24.25 h-10.5 py-3 px-4 text-xs font-medium rounded-full disabled:bg-white-90 disabled:bg-black-40"
        >
          <span>Invite user</span>
        </LoadingButton>
      </form>
    </div>

    <QueryStateWrapper
      :isLoading="isFolderMembersLoading"
      :is-error="isFolderMembersError"
      @retry="refetchFolderMembers"
      loading-title="Loading members"
    >
      <MembersItem
        v-for="member in folderMembersData?.data.members || []"
        :key="member.id"
        :avatar_url="member.user.avatarUrl"
        :name="member.user.firstName + ' ' + member.user.lastName"
        :email="member.user.email"
        :role="member.role"
        :accessLevel="member.accessLevel"
        :folder-id="props.folderId"
        :member-id="member.id"
      />
    </QueryStateWrapper>

    <div
      v-if="folderMembersData?.data.permission.role === 'owner' || !props.isProtected"
      class="w-full flex items-center justify-between p-6 border-t border-[#292D321A]"
    >
      <div class="flex flex-col gap-1">
        <p class="text-lg font-medium leading-[100%] text-black-90">
          Add extra security to your link
        </p>
        <p class="text-sm leading-4.5 text-black-70">
          Set a password to control who can join via your link
        </p>
      </div>

      <Button
        @click="showAddPasswordDialog = true"
        class="w-fit h-11 text-base font-medium leading-5.5 text-white -tracking-[1%] rounded-full py-2 px-4 bg-black-100 hover:bg-black-90"
      >
        Add password
      </Button>
    </div>
  </ActionDialogWrapper>

  <AddPasswordDialog
    v-model="showAddPasswordDialog"
    :folder-id="folderId"
  />
</template>
