import { BaseForm } from '@/components/re-useable';

export function createTypedForm<T>() {
  return BaseForm as unknown as new () => {
    $props: InstanceType<typeof BaseForm>['$props'] & {
      name: keyof T;
    };
  };
}
