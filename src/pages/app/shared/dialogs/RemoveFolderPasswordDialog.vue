<script setup lang="ts">
import { TrashIcon } from '@/components/icons';
import { BaseAlertDialog } from '@/components/re-useable';
import { useRemovePasswordFromFolder } from '@/hooks/useFolder';

interface Props {
  folderId: string;
}

const props = defineProps<Props>();

const displayBool = defineModel<boolean>({ default: false });

const { mutate: removePassword, isPending: isRemovingPassword } = useRemovePasswordFromFolder();

function handleDelete() {
  removePassword({ folderId: props.folderId });
}

function handleCancel() {
  displayBool.value = false;
}
</script>

<template>
  <BaseAlertDialog
    v-model:open="displayBool"
    :isLoading="isRemovingPassword"
    title="Remove password"
    description="Are you sure you want to remove the password from this folder? You can always add a new password later if you want to protect it again."
    :confirm="{ label: 'Yes, remove', action: handleDelete }"
    :cancel="{ label: `No, don't remove`, action: handleCancel }"
    :classNames="{
      content:
        'w-100! flex flex-col items-center px-0 pb-0 pt-10 rounded-[30px] border-stroke-1/20 space-y-0',
      header: 'flex flex-col gap-1 items-center px-6',
      title: 'text-2xl font-medium leading-9.5 text-black-90 text-center',
      description: 'text-base text-black-60 text-center',
      footer: 'w-full border-t border-stroke-1/10 px-9 py-7.5 flex items-center gap-4',
      cancel:
        'w-1/2 h-11 py-2 px-4 rounded-full bg-contemporary-background text-base font-medium leading-5.5 text-black-100 border-none',
      confirm:
        'w-1/2 h-11 py-2 px-4 rounded-full bg-danger-100 hover:bg-danger-100/90 text-base font-medium leading-5.5 text-white'
    }"
  >
    <div class="size-15.25 flex items-center justify-center rounded-full bg-[#FF2F000A]">
      <TrashIcon class="size-7 stroke-danger-100" />
    </div>
  </BaseAlertDialog>
</template>
