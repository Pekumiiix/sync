<script setup lang="ts">
import { useForm } from 'vee-validate';

import { BasePasswordInput } from '@/components/re-useable';
import { LoadingButton } from '@/components/shared';
import { useChangePasswordForFolder } from '@/hooks/useFolder';
import { createTypedForm } from '@/utils/formUtils';

import {
  type ChangeFolderPasswordData,
  changeFolderPasswordSchema
} from '../schemas/change-folder-password.schema';
import { ActionDialogWrapper } from '../wrappers';

interface Props {
  folderId: string;
}

const props = defineProps<Props>();

const { handleSubmit, meta, isSubmitting } = useForm<ChangeFolderPasswordData>({
  validationSchema: changeFolderPasswordSchema,
  initialValues: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
});

const { mutate: changePasswordForFolder, isPending } = useChangePasswordForFolder();

const onSubmit = handleSubmit((data: ChangeFolderPasswordData) => {
  changePasswordForFolder({
    folderId: props.folderId,
    newPassword: data.newPassword,
    oldPassword: data.oldPassword
  });
});

const TypedFormField = createTypedForm<ChangeFolderPasswordData>();

const displayBool = defineModel<boolean>({ default: false });
</script>

<template>
  <ActionDialogWrapper
    v-model="displayBool"
    title="Change Folder Password"
    content-class="max-w-[625px] w-full"
    description="Update your folder password"
  >
    <form
      @submit="onSubmit"
      class="w-full flex flex-col gap-5 px-6 pt-6 mb-6"
    >
      <TypedFormField
        name="oldPassword"
        label="Current Password"
      >
        <template #default="fieldProps">
          <BasePasswordInput v-bind="fieldProps" />
        </template>
      </TypedFormField>
      <TypedFormField
        name="newPassword"
        label="New Password"
      >
        <template #default="fieldProps">
          <BasePasswordInput v-bind="fieldProps" />
        </template>
      </TypedFormField>
      <TypedFormField
        name="confirmPassword"
        label="Confirm New Password"
      >
        <template #default="fieldProps">
          <BasePasswordInput v-bind="fieldProps" />
        </template>
      </TypedFormField>
    </form>

    <div class="flex items-center justify-end p-6 border-t border-stroke-1/10">
      <LoadingButton
        @click="onSubmit"
        :isLoading="isSubmitting || isPending"
        :disabled="!meta.valid || isSubmitting || isPending"
        class="w-fit h-11 text-base font-medium leading-5.5 text-white tracking-[-1%] bg-black-100 py-2 px-4 rounded-full hover:bg-black-90"
      >
        <span>Change Password</span>
      </LoadingButton>
    </div>
  </ActionDialogWrapper>
</template>
