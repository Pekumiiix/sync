<script setup lang="ts">
import { useForm } from 'vee-validate';

import { BaseAvatar, BaseDialog, BasePasswordInput } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { createTypedForm } from '@/utils/formUtils';

import { type JoinWorkspaceData, joinWorkspaceSchema } from '../schemas/join-workspace.schema';

const { handleSubmit, meta } = useForm<JoinWorkspaceData>({
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
        <div class="flex flex-col gap-0.5">
          <p class="text-xl font-medium leading-7 text-white">Unsorted Workspace</p>
          <div class="flex items-center gap-1.5 text-xs text-white-70">
            Invited by
            <div class="flex items-center gap-1 text-white-90">
              <BaseAvatar
                fallback="Johnson"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                class="size-3"
              />
              Johnson
            </div>
            <span class="size-1 rounded-full bg-white-70" /> 3 mins ago
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

        <Button
          :disabled="!meta.valid"
          class="w-full h-12 rounded-full py-3.75 px-6 text-sm font-inter-tight font-medium"
        >
          Join Workspace
        </Button>
      </div>
    </form>
  </BaseDialog>
</template>
