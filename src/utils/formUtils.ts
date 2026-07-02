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

export function getChangedValues<T extends Record<string, any>>(
  values: T,
  initial: Partial<T>
): { changedValues: Partial<T> } | undefined {
  const changedValues = (Object.keys(values) as Array<keyof T>).reduce((patchPayload, key) => {
    if (values[key] !== initial[key]) {
      patchPayload[key] = values[key];
    }

    return patchPayload;
  }, {} as Partial<T>);

  if (Object.keys(changedValues).length === 0) {
    console.log('No fields were changed. Aborting network request.');

    return undefined;
  }

  return { changedValues };
}
