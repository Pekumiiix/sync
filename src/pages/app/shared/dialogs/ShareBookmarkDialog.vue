<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useForm } from 'vee-validate';

import { LinkIcon } from '@/components/icons';
import { BaseSelect } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import env from '@/config/env';
import { useClipboard } from '@/hooks/useClipboard';
import { createTypedForm } from '@/utils/formUtils';

import { MembersItem } from '../components';
import { type ShareBookmarkData, shareBookmarkSchema } from '../schemas/share-bookmark.schema';
import { ActionDialogWrapper } from '../wrappers';
import { AddPasswordDialog } from '.';

const route = useRoute();

const { copy, hasCopied } = useClipboard();

const { handleSubmit, meta, isSubmitting } = useForm<ShareBookmarkData>({
  validationSchema: shareBookmarkSchema,
  initialValues: {
    email: '',
    action: 'edit'
  }
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
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
          @click="copy(`${env.frontendUrl}${route.path}`)"
          :disabled="hasCopied"
          variant="outline"
          class="w-21.25 h-9.5 text-xs font-medium leading-[100%] py-3 px-4 rounded-full bg-white border-stroke-1/10"
        >
          Copy link
        </Button>
      </div>

      <form
        @submit="onSubmit"
        class="flex items-center gap-2.5 pt-5"
      >
        <div
          class="w-full h-10.5 flex items-center justify-between p-1 pl-4 border-2 border-[#E8E8E8] rounded-full"
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

          <TypedFormField name="action">
            <template #default="fieldProps">
              <BaseSelect
                v-bind="fieldProps"
                :options="[
                  { value: 'edit', label: 'Can edit' },
                  { value: 'view', label: 'Can view' }
                ]"
                :class-names="{
                  trigger:
                    'rounded-full p-3 border-none text-xs font-medium text-black-90 bg-[#F9F9Fa]'
                }"
              />
            </template>
          </TypedFormField>
        </div>

        <Button
          :disabled="isSubmitting || !meta.valid"
          class="w-24.25 h-10.5 py-3 px-4 text-xs font-medium rounded-full disabled:bg-white-90 disabled:bg-black-40"
        >
          Invite user
        </Button>
      </form>
    </div>

    <MembersItem
      avatar_url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      name="Pelumi Amao"
      email="pelumi@amao.com"
      role="admin"
    />

    <div class="w-full flex items-center justify-between p-6 border-t border-[#292D321A]">
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

  <AddPasswordDialog v-model="showAddPasswordDialog" />
</template>
