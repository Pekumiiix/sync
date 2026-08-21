import { BaseForm } from '@/components/re-useable';
import { BaseAuthForm } from '@/pages/auth/shared/components';

export function createTypedForm<T>() {
  return BaseForm as unknown as new () => {
    $props: InstanceType<typeof BaseForm>['$props'] & {
      name: keyof T;
    };
  };
}

export function createAuthTypedForm<T>() {
  return BaseAuthForm as unknown as new () => {
    $props: InstanceType<typeof BaseAuthForm>['$props'] & {
      name: keyof T;
    };
  };
}
