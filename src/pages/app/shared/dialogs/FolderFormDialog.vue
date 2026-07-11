<script setup lang="ts">
import { watch } from 'vue';
import { useForm } from 'vee-validate';

import { BaseDialog } from '@/components/re-useable';
import { LoadingButton } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateFolder, useEditFolder } from '@/hooks/useFolder';
import { createTypedForm } from '@/utils/formUtils';

import { type CreateFolderData, createFolderSchema } from '../schemas/create-folder.schema';

type CreateFolderProps = {
  type: 'create';
  name?: never;
  folderId?: never;
};

type AddFolderProps = {
  type: 'edit';
  name: string;
  folderId: string;
};

type Props = CreateFolderProps | AddFolderProps;

const props = defineProps<Props>();

const displayBool = defineModel({ default: false });

const { handleSubmit, meta, isSubmitting, resetForm } = useForm<CreateFolderData>({
  validationSchema: createFolderSchema,
  initialValues: {
    name: props.name
  }
});

watch(displayBool, (isOpen) => {
  if (isOpen) {
    resetForm({ values: { name: props.name } });
  }
});

const { mutate: createFolder, isPending: isCreatingFolder } = useCreateFolder();
const { mutate: editFolder, isPending: isEditingFolder } = useEditFolder();

const onSubmit = handleSubmit(async (values) => {
  if (props.type === 'edit') {
    editFolder(
      { ...values, folderId: props.folderId },
      {
        onSuccess: () => {
          displayBool.value = false;
        }
      }
    );
  } else {
    createFolder(values, {
      onSuccess: () => {
        displayBool.value = false;
      }
    });
  }
});

const TypedFormField = createTypedForm<CreateFolderData>();
</script>

<template>
  <BaseDialog
    v-model="displayBool"
    :title="type === 'edit' ? 'Edit folder' : 'Create new folder'"
    description="Enter a name for your folder"
    :img="{
      src: '/images/app/dialogs/folder.png',
      alt: 'Folder',
      class: 'size-21'
    }"
    :class-names="{
      content:
        'max-w-156.25 w-full h-fit flex flex-col items-center gap-6 px-0 pb-0 pt-6 rounded-[25px] border-stroke-1/20',
      header: 'flex flex-col items-center',
      title: 'text-2xl font-medium leading-9.5',
      description: 'sr-only'
    }"
  >
    <form
      @submit="onSubmit"
      class="w-full flex flex-col gap-6"
    >
      <TypedFormField
        name="name"
        :class-names="{
          item: 'px-6'
        }"
      >
        <template #default="fieldProps">
          <Input
            v-bind="fieldProps"
            placeholder="Enter folder name"
            class="w-full h-12.5 rounded-full"
          />
        </template>
      </TypedFormField>

      <div class="w-full grid grid-cols-2 gap-3.75 p-6 border-t border-stroke-1/10">
        <Button
          type="button"
          @click="displayBool = false"
          variant="ghost"
          class="w-full h-11 rounded-full text-base font-medium leading-5.5 bg-[#F8F8F9]"
        >
          Cancel
        </Button>

        <LoadingButton
          class="w-full h-11 rounded-full text-base font-medium leading-5.5"
          :isLoading="isSubmitting || isEditingFolder || isCreatingFolder"
          :disabled="!meta.valid || isSubmitting || isEditingFolder || isCreatingFolder"
        >
          <span>Continue</span>
        </LoadingButton>
      </div>
    </form>
  </BaseDialog>
</template>
