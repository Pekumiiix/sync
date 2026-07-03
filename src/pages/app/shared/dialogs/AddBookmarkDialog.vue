<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';

import { LoadingButton } from '@/components/shared';
import { Input } from '@/components/ui/input';
import { useCreateBookmark, useGetBookmarkPreview } from '@/hooks/useBookmark';
import type { BrowserProvider } from '@/types/app.type';
import { createTypedForm } from '@/utils/formUtils';

import { type AddBookmarkData, addBookmarkSchema } from '../schemas/add-bookmark.schema';
import { type CreateBookmarkData } from '../schemas/create-bookmark.schema';
import { AddBookmarkDialogWrapper } from '../wrappers';
import { CreateBookmarkDialog } from '.';

const { handleSubmit, meta, isSubmitting } = useForm<AddBookmarkData>({
  validationSchema: addBookmarkSchema
});

const { mutate: getBookmarkPreview, isPending: isLoading } = useGetBookmarkPreview();
const { mutate: createBookmark, isPending: isCreating } = useCreateBookmark();

const bookmarkDetails = ref<Omit<CreateBookmarkData, 'tags' | 'folderId' | 'browser'> | undefined>(
  undefined
);

const onSubmit = handleSubmit(async (values) => {
  getBookmarkPreview(values, {
    onSuccess(data) {
      const previewData = data?.data.openGraphData;

      bookmarkDetails.value = {
        title: previewData?.title ?? '',
        description: previewData?.description ?? '',
        coverImageUrl: previewData?.coverImageUrl ?? '',
        favIconUrl: previewData?.faviconUrl ?? '',
        url: values.url,
        domain: previewData?.domain ?? '',
        websiteName: previewData?.websiteName ?? ''
      };

      displayBool.value = false;
      detailsDisplayBool.value = true;
    },
    onError() {
      console.error('Failed to fetch Open Graph data');
    }
  });
});

function handleCreateBookmark(data: CreateBookmarkData) {
  createBookmark(
    {
      folderId: data.folderId,
      title: data.title,
      description: data.description,
      url: data.url,
      tags: data.tags,
      faviconUrl: data.favIconUrl,
      coverImageUrl: data.coverImageUrl,
      browser: data.browser as BrowserProvider,
      websiteName: data.websiteName,
      domain: data.domain
    },
    {
      onSuccess() {
        detailsDisplayBool.value = false;
      },
      onError() {
        console.error('Failed to create bookmark');
      }
    }
  );
}

const TypedFormField = createTypedForm<AddBookmarkData>();

const displayBool = defineModel<boolean>({ default: false });
const detailsDisplayBool = ref<boolean>(false);
</script>

<template>
  <AddBookmarkDialogWrapper
    v-model="displayBool"
    :isLoading="isLoading"
  >
    <form
      @submit="onSubmit"
      class="w-full flex gap-2.5 py-5"
    >
      <TypedFormField
        name="url"
        :classNames="{ item: 'w-full' }"
      >
        <template #default="fieldProps">
          <Input
            v-bind="fieldProps"
            class="w-full h-11 py-1 pl-4 pr-2 rounded-full border-[#E8E8E8]"
          />
        </template>
      </TypedFormField>

      <LoadingButton
        class="w-26.25 h-11 px-4 py-2 rounded-full"
        :isLoading="isSubmitting"
        :disabled="!meta.valid"
        variant="default"
      >
        <span>Import</span>
      </LoadingButton>
    </form>
  </AddBookmarkDialogWrapper>

  <CreateBookmarkDialog
    v-if="bookmarkDetails"
    v-model="detailsDisplayBool"
    :data="bookmarkDetails"
    :isCreating="isCreating"
    @save="handleCreateBookmark"
  />
</template>
