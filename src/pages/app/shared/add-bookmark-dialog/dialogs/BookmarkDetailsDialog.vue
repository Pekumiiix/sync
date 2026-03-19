<script setup lang="ts">
import { ref } from 'vue';
import { X } from 'lucide-vue-next';
import { useForm } from 'vee-validate';

import { BaseForm, BaseSelect } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { ActionDialogWrapper } from '../..';
import { type BookmarkDetails, bookmarkDetailsSchema } from '../schemas/bookmark-details.schema';

interface Props {
  data: Omit<BookmarkDetails, 'collection'>;
}

const props = defineProps<Props>();

const displayBool = defineModel<boolean>({ default: false });

const { handleSubmit, values, setFieldValue } = useForm<BookmarkDetails>({
  validationSchema: bookmarkDetailsSchema,
  initialValues: {
    image: props.data?.image,
    title: props.data?.title,
    description: props.data?.description,
    url: props.data?.url,
    tags: props.data?.tags,
    collection: 'unsorted'
  }
});

const onSubmit = handleSubmit((data: BookmarkDetails) => {
  console.log(data);
});

const currentTags = values.tags || [];
const currentTag = ref<string>('');

function handleAddTag() {
  const tag = currentTag.value.trim();

  if (!tag) return;

  if (!currentTags.includes(tag)) {
    setFieldValue('tags', [...currentTags, tag]);
  }

  currentTag.value = '';
}

function removeTag(tagToRemove: string) {
  setFieldValue(
    'tags',
    currentTags.filter((t) => t !== tagToRemove)
  );
}

const fieldClassName =
  'w-full h-12.25! text-base leading-[100%] text-black-90 placeholder:text-black-60 py-3.5 px-4.5 rounded-full border border-[#E8E8E8]';
</script>

<template>
  <ActionDialogWrapper
    v-model="displayBool"
    title="Add bookmark manually"
    description="Enter the URL and details below to save a new bookmark to your collection."
    content-class="w-[625px] max-h-[90vh] h-fit"
    :show-description="false"
  >
    <form
      @submit="onSubmit"
      class="w-full h-full flex flex-col gap-6 pb-6 pt-5"
    >
      <div class="flex flex-col gap-6 px-6">
        <div class="flex items-center gap-4">
          <img
            :src="values.image"
            alt="Logo"
            class="size-21 rounded-full border border-white-15 p-px"
          />

          <div class="flex flex-col">
            <p class="text-2xl leading-9.5 font-medium text-stroke-1">{{ values.title }}</p>
            <p class="text-lg leading-[160%] font-inter text-black-70">{{ values.description }}</p>
          </div>
        </div>

        <BaseForm
          name="collection"
          label="Collection"
        >
          <template #default="fieldProps">
            <BaseSelect
              v-bind="fieldProps"
              :options="[{ value: 'unsorted', label: 'Unsorted' }]"
              :class-names="{
                trigger: fieldClassName
              }"
          /></template>
        </BaseForm>

        <div class="w-full flex flex-col gap-2">
          <BaseForm
            name="tags"
            label="Tags"
          >
            <Input
              v-model="currentTag"
              @keydown.enter.prevent="handleAddTag"
              placeholder="Enter tags"
              :class="fieldClassName"
            />
          </BaseForm>

          <div class="flex flex-wrap gap-2">
            <div
              v-for="tag in values.tags"
              :key="tag"
              class="w-fit relative"
            >
              <span class="px-2 py-1 bg-gray-100 rounded-md text-black-90 font-medium">
                {{ tag }}
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

        <div class="flex flex-col gap-2">
          <Label class="text-lg leading-6 text-black-90 font-medium">URL</Label>
          <p :class="cn('flex items-center', fieldClassName)">{{ values.url }}</p>
        </div>
      </div>

      <div class="flex items-center justify-end p-6 border-t border-stroke-1/10">
        <Button
          type="submit"
          class="w-32 h-12 rounded-full text-base font-medium"
        >
          Save
        </Button>
      </div>
    </form>
  </ActionDialogWrapper>
</template>
