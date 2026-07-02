<script setup lang="ts">
import { ref } from 'vue';
import { useDropZone } from '@vueuse/core';
import { LoaderCircle } from 'lucide-vue-next';
import { useForm } from 'vee-validate';

import { BaseAvatar } from '@/components/re-useable';
import { Input } from '@/components/ui/input';
import { useUpdateProfile } from '@/hooks/useAccount';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth.store';
import { getChangedValues } from '@/utils/formUtils';

import { SettingsInputField } from '../components';
import {
  type AccountInformationData,
  accountInformationSchema
} from '../schemas/account-information.schema';
import { SettingsSubSectionWrapper, SettingsWrapper } from '../wrappers';

const dropZoneRef = ref<HTMLDivElement>();
const fileInputRef = ref<HTMLInputElement>();

const disabled = ref(false);
const isUploading = ref(false);

const selectedFile = ref<File | null>(null);

const { user } = useAuthStore();
const { mutate, isPending } = useUpdateProfile();

const { handleSubmit, values, setFieldValue, meta, resetForm, isSubmitting } =
  useForm<AccountInformationData>({
    validationSchema: accountInformationSchema,
    initialValues: {
      avatarUrl: user?.avatarUrl || undefined,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      location: user?.location || undefined
    }
  });

const onSubmit = handleSubmit((values) => {
  const initial = meta.value.initialValues as Partial<AccountInformationData>;

  const payload = getChangedValues(values, initial);

  if (!payload) return;

  mutate(payload.changedValues);
});

function onDrop(files: File[] | null) {
  if (files && files.length > 0) {
    const file = files[0];

    if (file) {
      selectedFile.value = file;

      console.log('File ready for upload:', file.name);

      setFieldValue('avatarUrl', URL.createObjectURL(file));
    }
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ['image/jpeg', 'image/png']
});

function triggerFilePicker() {
  const refValue = fileInputRef.value;

  if (!refValue) return;

  const nativeElement = ('$el' in refValue ? refValue.$el : refValue) as HTMLInputElement;

  nativeElement.click();
}

function onInputChange(event: Event) {
  const target = event.target as HTMLInputElement;

  if (target.files && target.files.length > 0) {
    const file = target.files[0];

    if (file) {
      selectedFile.value = file;
      setFieldValue('avatarUrl', URL.createObjectURL(file));
    }
  }
}
</script>

<template>
  <SettingsWrapper
    title="Account information"
    description="Manage your personal details, login credentials, and security settings"
    :isDirty="meta.dirty"
    :is-loading="isSubmitting || isPending"
    :on-cancel="() => resetForm()"
    :on-save="() => onSubmit()"
  >
    <SettingsSubSectionWrapper
      title="Profile picture"
      description="Upload your picture"
      class="pt-0! border-none"
    >
      <div
        ref="dropZoneRef"
        :aria-disabled="disabled || isUploading"
        @click="triggerFilePicker"
        :class="
          cn(
            'relative size-35 rounded-full outline-2 outline-offset-2 cursor-pointer transition-colors',
            {
              'outline-primary-100': isOverDropZone,
              'outline-transparent': !isOverDropZone
            }
          )
        "
      >
        <BaseAvatar
          :src="values.avatarUrl"
          :fallback="user?.firstName || user?.lastName || 'User'"
          :class="
            cn('size-35', {
              'cursor-not-allowed opacity-50': disabled || isUploading
            })
          "
        />

        <div
          class="absolute right-0 bottom-0 size-9 rounded-full flex items-center justify-center bg-primary-100 z-10"
        >
          <LoaderCircle
            v-if="isUploading"
            class="size-4.75 stroke-2 stroke-white animate-spin"
          />

          <img
            v-else
            src="/images/app/settings/camera.png"
            alt="Camera"
            class="size-4.75"
          />
        </div>

        <Input
          type="file"
          ref="fileInputRef"
          accept="image/jpeg, image/png"
          class="hidden"
          @change="onInputChange"
        />
      </div>
    </SettingsSubSectionWrapper>

    <SettingsSubSectionWrapper
      title="Full name"
      description="Tell us your name"
    >
      <div class="max-w-139 w-full grid grid-cols-2 gap-6">
        <SettingsInputField
          name="firstName"
          label="First name"
          placeholder="Enter your first name"
        />

        <SettingsInputField
          name="lastName"
          label="Last name"
          placeholder="Enter your last name"
        />
      </div>
    </SettingsSubSectionWrapper>

    <SettingsSubSectionWrapper
      title="Email address"
      description="Tell us your email address"
    >
      <div class="max-w-139 w-full">
        <SettingsInputField
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
      </div>
    </SettingsSubSectionWrapper>

    <SettingsSubSectionWrapper
      title="Location"
      description="Tell us your location"
    >
      <div class="max-w-139 w-full">
        <SettingsInputField
          name="location"
          label="Location"
          placeholder="Enter your location"
        />
      </div>
    </SettingsSubSectionWrapper>
  </SettingsWrapper>
</template>
