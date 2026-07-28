import { computed, type MaybeRefOrGetter, toValue } from 'vue';

import type { IBrowser } from '@/types/bookmark.type';

export function computeFolderTabs(browsers: MaybeRefOrGetter<IBrowser[]>) {
  return computed(() => {
    const currentBrowsers = toValue(browsers) || [];

    return [
      {
        label: 'All',
        value: 'all' as const
      },
      ...currentBrowsers.map((browser) => ({
        label: browser.browser,
        value: browser.browser
      }))
    ];
  });
}
