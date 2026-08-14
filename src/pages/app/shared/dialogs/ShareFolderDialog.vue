<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';

import { BaseSelect } from '@/components/re-useable';
import { LoadingButton } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateInvitation } from '@/hooks/useInvitation';
import { useGetFolderMembers } from '@/hooks/useMember';
import { useAuthStore } from '@/stores/auth.store';
import { createTypedForm } from '@/utils/formUtils';

import { MembersItem } from '../components';
import { type ShareBookmarkData, shareBookmarkSchema } from '../schemas/share-bookmark.schema';
import { ActionDialogWrapper, QueryStateWrapper } from '../wrappers';
import {
  AddPasswordDialog,
  ChangeFolderPasswordDialog,
  PaywallDialog,
  RemoveFolderPasswordDialog
} from '.';

interface Props {
  folderId: string;
  isProtected: boolean;
}

const props = defineProps<Props>();

const {
  data: folderMembersData,
  isLoading: isFolderMembersLoading,
  isError: isFolderMembersError,
  refetch: refetchFolderMembers
} = useGetFolderMembers(() => ({
  folderId: props.folderId
}));
const { mutate: createInvitation, isPending: isCreatingInvitation } = useCreateInvitation();

const { handleSubmit, meta, isSubmitting, resetForm } = useForm<ShareBookmarkData>({
  validationSchema: shareBookmarkSchema,
  initialValues: {
    email: '',
    accessLevel: 'editor'
  }
});

const onSubmit = handleSubmit(async (values) => {
  createInvitation(
    {
      folderId: props.folderId,
      email: values.email,
      accessLevel: values.accessLevel
    },
    {
      onSuccess: () => {
        resetForm({
          values: {
            email: '',
            accessLevel: 'editor'
          }
        });
      }
    }
  );
});

const TypedFormField = createTypedForm<ShareBookmarkData>();

const authStore = useAuthStore();

const showAddPasswordDialog = ref(false);
const showChangePasswordDialog = ref(false);
const showRemovePasswordDialog = ref(false);
const showPaywallDialog = ref(false);

const displayBool = defineModel<boolean>({ default: false });

function handleAddPasswordClick() {
  if (authStore.user?.subscription.plan === 'free') {
    showPaywallDialog.value = true;
  } else {
    showAddPasswordDialog.value = true;
  }
}

function handleChangePasswordClick() {
  if (authStore.user?.subscription.plan === 'free') {
    showPaywallDialog.value = true;
  } else {
    showChangePasswordDialog.value = true;
  }
}
</script>

<template>
  <ActionDialogWrapper
    v-model="displayBool"
    title="Invite collaborators"
    description="Share access with teammates or collaborators"
  >
    <div class="flex flex-col gap-1 px-6 pt-4.5">
      <form
        @submit="onSubmit"
        class="flex items-center gap-2.5 pt-5"
      >
        <div
          class="w-full h-10.5 flex items-center justify-between p-1 pl-4 outline-2 outline-[#E8E8E8] rounded-full"
        >
          <TypedFormField
            name="email"
            :show-message="false"
            :class-names="{ item: 'w-full' }"
          >
            <template #default="fieldProps">
              <Input
                v-bind="fieldProps"
                placeholder="Enter email..."
                class="text-xs leading-[100%] placeholder:text-black-70 p-0 border-none rounded-none focus-visible:ring-0"
              />
            </template>
          </TypedFormField>

          <TypedFormField name="accessLevel">
            <template #default="fieldProps">
              <BaseSelect
                v-bind="fieldProps"
                :options="[
                  { value: 'editor', label: 'Can edit' },
                  { value: 'viewer', label: 'Can view' }
                ]"
                :class-names="{
                  trigger:
                    'rounded-full p-3 border-none text-xs font-medium text-black-90 bg-[#F9F9Fa]'
                }"
              />
            </template>
          </TypedFormField>
        </div>

        <LoadingButton
          :isLoading="isSubmitting || isCreatingInvitation"
          :disabled="isSubmitting || !meta.valid || isCreatingInvitation"
          class="w-24.25 h-10.5 py-3 px-4 text-xs font-medium rounded-full disabled:bg-white-90 disabled:bg-black-40"
        >
          <span>Invite user</span>
        </LoadingButton>
      </form>
    </div>

    <QueryStateWrapper
      :isLoading="isFolderMembersLoading"
      :is-error="isFolderMembersError"
      @retry="refetchFolderMembers"
      loading-title="Loading members"
    >
      <div class="flex flex-col overflow-y-auto">
        <MembersItem
          v-for="member in folderMembersData?.data.members || []"
          :key="member.id"
          :member="member"
          :member-id="member.id"
        />
      </div>
    </QueryStateWrapper>

    <div
      v-if="folderMembersData?.data.permission.role === 'owner' && !props.isProtected"
      class="w-full flex items-center justify-between p-6 border-t border-[#292D321A]"
    >
      <div class="flex flex-col gap-1">
        <p class="text-lg font-medium leading-[100%] text-black-90">
          Add extra security to your link
        </p>
        <p class="text-sm leading-4.5 text-black-70">
          Set a password to control who can join via your link
        </p>
      </div>

      <Button
        @click="handleAddPasswordClick"
        class="w-fit h-11 text-base font-medium leading-5.5 text-white tracking-[-1%] rounded-full py-2 px-4 bg-black-100 hover:bg-black-90 transition-colors"
      >
        Add password
      </Button>
    </div>

    <div
      v-if="folderMembersData?.data.permission.role === 'owner' && props.isProtected"
      class="w-full flex items-center justify-between p-6 border-t border-[#292D321A]"
    >
      <div class="flex flex-col gap-1">
        <p class="text-lg font-medium leading-[100%] text-black-90">Link is password protected</p>
        <p class="text-sm leading-4.5 text-black-70">Control access to your protected folder</p>
      </div>

      <div class="flex items-center gap-2">
        <Button
          variant="ghost"
          @click="showRemovePasswordDialog = true"
          class="w-fit h-11 text-base font-medium leading-5.5 text-red-600 tracking-[-1%] rounded-full py-2 px-4 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          Remove
        </Button>
        <Button
          @click="handleChangePasswordClick"
          class="w-fit h-11 text-base font-medium leading-5.5 text-white tracking-[-1%] rounded-full py-2 px-4 bg-black-100 hover:bg-black-90 transition-colors"
        >
          Change
        </Button>
      </div>
    </div>
  </ActionDialogWrapper>

  <AddPasswordDialog
    v-model="showAddPasswordDialog"
    :folder-id="folderId"
  />
  <ChangeFolderPasswordDialog
    v-if="showChangePasswordDialog"
    v-model="showChangePasswordDialog"
    :folder-id="folderId"
  />
  <RemoveFolderPasswordDialog
    v-if="showRemovePasswordDialog"
    v-model="showRemovePasswordDialog"
    :folder-id="folderId"
  />

  <PaywallDialog v-model="showPaywallDialog" />
</template>
