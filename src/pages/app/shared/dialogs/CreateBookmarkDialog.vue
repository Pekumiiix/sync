<script setup lang="ts">
import { ref } from 'vue';
import { watch } from 'vue';
import { X } from 'lucide-vue-next';
import { useForm } from 'vee-validate';

import { LoadingButton } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetFolders } from '@/hooks/useFolder';
import { handleImageError } from '@/utils/bookmarkUtils';
import { createTypedForm } from '@/utils/formUtils';
import { truncateString } from '@/utils/stringutils';

import { FolderSelect } from '../components';
import { type CreateBookmarkData, createBookmarkSchema } from '../schemas/create-bookmark.schema';
import { ActionDialogWrapper } from '../wrappers';

interface Props {
  isCreating: boolean;
  data: Omit<CreateBookmarkData, 'tags' | 'folderId' | 'browser'>;
  onSave: (data: CreateBookmarkData) => void;
}

const props = defineProps<Props>();

const displayBool = defineModel<boolean>({ default: false });

const { handleSubmit, values, setFieldValue, isSubmitting, meta, resetForm } =
  useForm<CreateBookmarkData>({
    validationSchema: createBookmarkSchema,
    initialValues: {
      title: props.data.title,
      description: props.data.description,
      url: props.data.url,
      domain: props.data.domain,
      websiteName: props.data.websiteName,
      favIconUrl: props.data.favIconUrl,
      coverImageUrl: props.data.coverImageUrl,
      browser: 'manual'
    }
  });

watch(
  () => props.data,
  (newData) => {
    resetForm({
      values: {
        title: newData.title,
        description: newData.description,
        url: newData.url,
        domain: newData.domain,
        websiteName: newData.websiteName,
        favIconUrl: newData.favIconUrl,
        coverImageUrl: newData.coverImageUrl,
        browser: 'manual',
        tags: []
      }
    });
  },
  { deep: true }
);

const onSubmit = handleSubmit((data: CreateBookmarkData) => {
  props.onSave(data);
});

const currentTag = ref<string>('');

function handleAddTag() {
  const tag = currentTag.value.trim();

  if (!tag) return;

  const currentTagsArray = values.tags || [];

  if (!currentTagsArray.includes(tag)) {
    setFieldValue('tags', [...currentTagsArray, tag]);
  }

  currentTag.value = '';
}

function removeTag(tagToRemove: string) {
  const currentTagsArray = values.tags || [];

  setFieldValue(
    'tags',
    currentTagsArray.filter((t) => t !== tagToRemove)
  );
}

const TypedFormField = createTypedForm<CreateBookmarkData>();

const { data: foldersData } = useGetFolders();

const fieldClassName =
  'w-full h-12.25! text-base leading-[100%] text-black-90 placeholder:text-black-60 py-3.5 px-4.5 rounded-full border border-[#E8E8E8]';
</script>

<template>
  <ActionDialogWrapper
    v-model="displayBool"
    title="Add Bookmark"
    description="Enter the URL and details below to save a new bookmark to your collection."
    content-class="w-[625px] max-h-[90vh] h-fit"
    :show-description="false"
  >
    <form
      @submit="onSubmit"
      class="w-full h-full flex flex-col gap-6 pb-6 pt-5"
    >
      <div class="flex flex-col gap-6 px-6">
        <div class="flex gap-4">
          <img
            :src="values.favIconUrl"
            alt="Logo"
            class="size-21 rounded-full border border-white-15 p-px shrink-0"
            @error="handleImageError"
          />

          <div class="flex flex-col">
            <p class="text-2xl leading-9.5 font-medium text-stroke-1">
              {{ truncateString(values.title || '', 30) }}
            </p>
            <p class="text-lg leading-[160%] font-inter text-black-70">
              {{ truncateString(values.description || '', 100) }}
            </p>
          </div>
        </div>

        <TypedFormField
          name="folderId"
          label="Folder"
        >
          <template #default="fieldProps">
            <FolderSelect
              v-bind="fieldProps"
              :groups="[
                {
                  label: 'System Folders',
                  options: foldersData?.data.systemFolders || []
                },
                {
                  label: 'Owned Folders',
                  options: foldersData?.data.ownedFolders || []
                },
                {
                  label: 'Shared Folders',
                  options: foldersData?.data.sharedFolders || []
                }
              ]"
            />
          </template>
        </TypedFormField>

        <div class="w-full flex flex-col gap-2">
          <TypedFormField
            name="tags"
            label="Tags"
          >
            <template #default>
              <Input
                v-model="currentTag"
                @keydown.enter.prevent="handleAddTag"
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

        <TypedFormField
          name="url"
          label="URL"
        >
          <template #default="fieldProps">
            <Input
              v-bind="fieldProps"
              readonly
              placeholder="Enter URL"
              :class="[fieldClassName, 'cursor-not-allowed']"
            />
          </template>
        </TypedFormField>
      </div>

      <div class="flex items-center justify-end p-6 pb-0 border-t border-stroke-1/10">
        <LoadingButton
          class="w-32 h-12 rounded-full text-base font-medium"
          :isLoading="isSubmitting || props.isCreating"
          :disabled="!meta.valid || isSubmitting || props.isCreating"
        >
          <span>Save</span>
        </LoadingButton>
      </div>
    </form>
  </ActionDialogWrapper>
</template>
