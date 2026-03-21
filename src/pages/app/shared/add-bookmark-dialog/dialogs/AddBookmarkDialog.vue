<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';

import { BaseForm } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { AddBookmarkDialogWrapper } from '../components';
import { type AddBookmarkData, addBookmarkSchema } from '../schemas/add-bookmark.schema';
import type { BookmarkDetails } from '../schemas/bookmark-details.schema';
import { BookmarkDetailsDialog } from '.';

const displayBool = defineModel<boolean>({ default: false });
const detailsDisplayBool = ref<boolean>(false);

const isLoading = ref<boolean>(false);

const bookmarkDetails = ref<Omit<BookmarkDetails, 'collection'> | undefined>(undefined);

const { handleSubmit, meta, isSubmitting } = useForm<AddBookmarkData>({
  validationSchema: addBookmarkSchema
});

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;

  console.log(values);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  bookmarkDetails.value = {
    image: '/images/app/sidebar/avatar.png',
    title: 'Sync',
    description: 'Sync your bookmarks with your browsers.',
    url: 'https://www.shadcn-vue.com/docs/',
    tags: ['me', 'myself', 'and', 'i']
  };

  isLoading.value = false;
  displayBool.value = false;
  detailsDisplayBool.value = true;
});

function handleCreateBookmark(data: BookmarkDetails) {
  console.log('Bookmark created:', data);
  detailsDisplayBool.value = false;
}
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
      <BaseForm
        name="url"
        :classNames="{ item: 'w-full' }"
      >
        <template #default="fieldProps">
          <Input
            v-bind="fieldProps"
            class="w-full h-11 py-1 pl-4 pr-2 rounded-full border-[#E8E8E8]"
          />
        </template>
      </BaseForm>

      <Button
        :disabled="isSubmitting || !meta.valid"
        type="submit"
        class="w-26.25 h-11 px-4 py-2 rounded-full mt-1.5"
      >
        Import
      </Button>
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
