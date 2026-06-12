<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';

import { LoadingButton } from '@/components/shared';
import { Input } from '@/components/ui/input';
import { useOpenGraph } from '@/hooks/useOpengrapgh';
import { createTypedForm } from '@/utils/formUtils';

import { type AddBookmarkData, addBookmarkSchema } from '../schemas/add-bookmark.schema';
import type { BookmarkDetails } from '../schemas/bookmark-details.schema';
import { AddBookmarkDialogWrapper } from '../wrappers';
import { BookmarkDetailsDialog } from '.';

const { handleSubmit, meta, isSubmitting } = useForm<AddBookmarkData>({
  validationSchema: addBookmarkSchema
});

const { mutate, isPending: isLoading } = useOpenGraph();

const onSubmit = handleSubmit(async (values) => {
  mutate(values.url, {
    onSuccess(data) {
      bookmarkDetails.value = {
        image: data?.image?.url ?? '',
        title: data?.title ?? '',
        description: data?.description ?? '',
        url: values.url,
        tags: [],
        folder_name: 'unsorted'
      };

      displayBool.value = false;
      detailsDisplayBool.value = true;
    },
    onError() {
      console.error('Failed to fetch Open Graph data');
    }
  });
});

function handleCreateBookmark(data: BookmarkDetails) {
  console.log('Bookmark created:', data);
  detailsDisplayBool.value = false;
}

const TypedFormField = createTypedForm<AddBookmarkData>();

const displayBool = defineModel<boolean>({ default: false });
const detailsDisplayBool = ref<boolean>(false);

const bookmarkDetails = ref<Omit<BookmarkDetails, 'collection'> | undefined>(undefined);
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

  <BookmarkDetailsDialog
    v-if="bookmarkDetails"
    v-model="detailsDisplayBool"
    :data="bookmarkDetails"
    @save="handleCreateBookmark"
    type="add"
  />
</template>
