<script setup lang="ts">
import { useForm } from 'vee-validate';

import { BasePasswordInput } from '@/components/re-useable';
import { LoadingButton } from '@/components/shared';
import { useAddPasswordToFolder } from '@/hooks/useFolder';
import { createTypedForm } from '@/utils/formUtils';

import { type AddPasswordData, addPasswordSchema } from '../schemas/add-password.schema';
import { ActionDialogWrapper } from '../wrappers';

interface Props {
  folderId: string;
}

const props = defineProps<Props>();

const { handleSubmit, meta, isSubmitting } = useForm<AddPasswordData>({
  validationSchema: addPasswordSchema,
  initialValues: {
    password: '',
    confirmPassword: ''
  }
});

const { mutate: addPasswordToFolder, isPending } = useAddPasswordToFolder();

const onSubmit = handleSubmit((data: AddPasswordData) => {
  addPasswordToFolder(
    {
      folderId: props.folderId,
      password: data.password
    },
    {
      onSuccess: () => {
        displayBool.value = false;
      }
    }
  );
});

const TypedFormField = createTypedForm<AddPasswordData>();

const displayBool = defineModel<boolean>({ default: false });
</script>

<template>
  <ActionDialogWrapper
    v-model="displayBool"
    title="Restrict access by setting a password"
    content-class="max-w-[625px] w-full"
    description="Add a password for security"
  >
    <form
      @submit="onSubmit"
      class="w-full flex flex-col gap-5 px-6 pt-6 mb-6"
    >
      <TypedFormField
        name="password"
        label="Enter password"
      >
        <template #default="fieldProps">
          <BasePasswordInput v-bind="fieldProps" />
        </template>
      </TypedFormField>
      <TypedFormField
        name="confirmPassword"
        label="Confirm password"
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
        class="w-fit h-11 text-base font-medium leading-5.5 text-white -tracking-[1%] bg-black-100 py-2 px-4 rounded-full hover:bg-black-90"
      >
        <span>Save Password</span>
      </LoadingButton>
    </div>
  </ActionDialogWrapper>
</template>
