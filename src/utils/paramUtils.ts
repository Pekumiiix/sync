import { computed, type Ref, type WritableComputedRef } from 'vue';

export function usePaginatedFilter<
  TParams extends Record<string, any>,
  TKey extends keyof TParams,
  TValue = NonNullable<TParams[TKey]>
>(
  params: TParams,
  key: TKey,
  defaultValue: TValue,
  currentPage?: Ref<number>
): WritableComputedRef<TValue> {
  return computed({
    get: () => (params[key] as TValue) ?? defaultValue,
    set: (newValue: TValue) => {
      params[key] = newValue as any;

      if (currentPage) {
        currentPage.value = 1;
      }
    }
  });
}
