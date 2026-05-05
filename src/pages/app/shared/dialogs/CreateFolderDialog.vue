<script setup lang="ts">
import { useForm } from 'vee-validate';

import { BaseDialog } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createTypedForm } from '@/utils/formUtils';

import { type CreateFolderData, createFolderSchema } from '../schemas/create-folder.schema';

const { handleSubmit, meta, isSubmitting } = useForm<CreateFolderData>({
  validationSchema: createFolderSchema
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const TypedFormField = createTypedForm<CreateFolderData>();

const displayBool = defineModel({ default: false });
</script>

<template>
  <BaseDialog
    v-model="displayBool"
    title="Create new folder"
    description="Enter a name for your new folder"
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
        <Button
          :disabled="isSubmitting || !meta.valid"
          class="w-full h-11 rounded-full text-base font-medium leading-5.5"
        >
          Continue
        </Button>
      </div>
    </form>
  </BaseDialog>
</template>
