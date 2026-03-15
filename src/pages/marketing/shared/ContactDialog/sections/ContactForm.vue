<script setup lang="ts">
import { useForm } from 'vee-validate';

import { BaseDialog, BaseForm } from '@/components/re-useable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { type ContactData,contactSchema } from '@/pages/marketing/schemas/contact.schema';

interface Props {
  open: boolean;
}

defineProps<Props>();

const emit = defineEmits(['open-change', 'success']);

const inputs = [
  { name: 'firstname', label: 'First name' },
  { name: 'lastname', label: 'Last name' },
  { name: 'email', label: 'Email address' },
  { name: 'country', label: 'Country' }
];

const { handleSubmit } = useForm({
  validationSchema: contactSchema
});

const onSubmit = handleSubmit((data: ContactData) => {
  console.log(data);
  emit('success');
});

function handleOpenChange(value: boolean) {
  emit('open-change', value);
}
</script>

<template>
  <BaseDialog
    :open="open"
    @open-change="handleOpenChange"
    title="Talk to us about your organization need"
    description="Our Enterprise solution is best for large companies with advanced security and support requirements."
    :class-names="{
      content:
        'w-[90%] md:min-w-175 lg:min-w-200 max-w-300 max-h-[90vh] h-fit flex flex-col gap-15 py-10 md:py-20 px-3 md:px-[91px] rounded-[12px] border-none [&>button]:hidden overflow-y-auto scrollbar-none',
      header: 'space-y-0.5',
      title:
        'text-2xl md:text-[36px] font-semibold leading-[38px] text-left md:text-center md:leading-11 text-black-100 -tracking-[1px]',
      description:
        'text-base md:text-xl leading-6 md:leading-7.5 text-left md:text-center text-black-80'
    }"
  >
    <form
      @submit="onSubmit"
      class="flex flex-col gap-15"
    >
      <div class="grid md:grid-cols-2 gap-y-5 gap-x-8">
        <BaseForm
          v-for="input in inputs"
          :key="input.name"
          :name="input.name"
          :label="input.label"
          :class-names="{ item: 'w-full' }"
          v-slot="fieldProps"
          ><Input
            v-bind="fieldProps"
            class="h-10! p-1.5 px-2.5 text-base placeholder:text-black-60 placeholder:text-base"
        /></BaseForm>

        <BaseForm
          name="company"
          label="Company"
          :class-names="{ item: 'w-full md:col-span-2' }"
          v-slot="fieldProps"
        >
          <Input
            v-bind="fieldProps"
            class="w-full h-10! p-1.5 px-2.5 text-base placeholder:text-black-60 placeholder:text-base"
          />
        </BaseForm>

        <BaseForm
          name="message"
          label="How we can we support you?"
          :class-names="{ item: 'w-full md:col-span-2' }"
          v-slot="fieldProps"
        >
          <Textarea
            v-bind="fieldProps"
            class="w-full h-30! py-1.5 px-2.5 text-base placeholder:text-black-60 placeholder:text-base"
          />
        </BaseForm>
      </div>

      <Button
        type="submit"
        class="w-full h-12 rounded-full text-base font-medium leading-7"
        >Contact Sales</Button
      >
    </form>
  </BaseDialog>
</template>
