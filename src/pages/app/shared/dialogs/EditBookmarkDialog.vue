<script setup lang="ts">
import { watch } from 'vue';
import { X } from 'lucide-vue-next';
import { useForm } from 'vee-validate';

import { LoadingButton } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEditBookmark } from '@/hooks/useBookmark';
import { handleImageError, useTags } from '@/utils/bookmarkUtils';
import { createTypedForm } from '@/utils/formUtils';

import { type EditBookmarkData, editBookmarkSchema } from '../schemas/edit-bookmark.schema';
import { ActionDialogWrapper } from '../wrappers';

interface BookmarkData extends EditBookmarkData {
  id: string;
  favIconUrl: string;
}

interface Props {
  data: BookmarkData;
}

const props = defineProps<Props>();

const displayBool = defineModel<boolean>({ default: false });

const { mutate: editBookmark, isPending } = useEditBookmark();

const { handleSubmit, values, setFieldValue, isSubmitting, meta, resetForm } =
  useForm<EditBookmarkData>({
    validationSchema: editBookmarkSchema,
    initialValues: {
      title: props.data.title,
      description: props.data.description,
      tags: props.data.tags
    }
  });

watch(
  () => props.data,
  (newData) => {
    resetForm({
      values: {
        title: newData.title,
        description: newData.description,
        tags: newData.tags
      }
    });
  },
  { deep: true }
);

const onSubmit = handleSubmit((data: EditBookmarkData) => {
  editBookmark(
    {
      bookmarkId: props.data.id,
      title: data.title,
      description: data.description,
      tags: data.tags
    },
    {
      onSuccess: () => {
        displayBool.value = false;
      }
    }
  );
});

const { currentTag, addTag, removeTag } = useTags(
  () => values.tags,
  (newTags) => setFieldValue('tags', newTags)
);

const TypedFormField = createTypedForm<EditBookmarkData>();

const fieldClassName =
  'w-full h-12.25! text-base leading-[100%] text-black-90 placeholder:text-black-60 py-3.5 px-4.5 rounded-full border border-[#E8E8E8]';
</script>

<template>
  <ActionDialogWrapper
    v-model="displayBool"
    title="Edit Bookmark"
    description="Update the details below to edit your bookmark."
    content-class="w-[625px] max-h-[90vh] h-fit"
    :show-description="false"
  >
    <form
      @submit="onSubmit"
      class="w-full h-full flex flex-col gap-6 pb-6 pt-5"
    >
      <div class="flex flex-col gap-6 px-6">
        <img
          :src="props.data.favIconUrl"
          alt="Logo"
          class="size-21 rounded-full border border-white-15 p-px shrink-0"
          @error="handleImageError"
        />

        <div class="w-full flex flex-col gap-2">
          <TypedFormField
            name="title"
            label="Title"
          >
            <template #default="fieldProps">
              <Input
                v-bind="fieldProps"
                placeholder="Enter title"
                :class="fieldClassName"
              />
            </template>
          </TypedFormField>

          <TypedFormField
            name="description"
            label="Description"
          >
            <template #default="fieldProps">
              <Textarea
                v-bind="fieldProps"
                placeholder="Enter description"
                :class="[fieldClassName, 'resize-none h-32 rounded-2xl! shadow-none']"
              />
            </template>
          </TypedFormField>

          <TypedFormField
            name="tags"
            label="Tags"
          >
            <template #default>
              <Input
                v-model="currentTag"
                @keydown.enter.prevent="addTag"
                placeholder="Enter tags"
                :class="fieldClassName"
              />
            </template>
          </TypedFormField>

          <div class="flex flex-wrap gap-2">
            <div
              v-for="tag in values.tags"
              :key="tag"
              class="w-fit relative"
            >
              <span class="px-2 py-1 bg-gray-100 rounded-md text-black-90 font-medium">
                #{{ tag }}
              </span>

              <Button
                type="button"
                variant="destructive"
                @click="removeTag(tag)"
                class="absolute -right-1 -top-1 p-px! size-fit"
              >
                <X class="size-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end p-6 pb-0 border-t border-stroke-1/10">
        <LoadingButton
          class="w-32 h-12 rounded-full text-base font-medium"
          :isLoading="isSubmitting || isPending"
          :disabled="!meta.valid || isSubmitting || isPending"
        >
          <span>Save</span>
        </LoadingButton>
      </div>
    </form>
  </ActionDialogWrapper>
</template>
