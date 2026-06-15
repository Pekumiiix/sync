import { ref } from 'vue';

import { toaster } from '@/utils/toastUtils';

export function useClipboard(resetDelay = 2000) {
  const hasCopied = ref(false);

  const copy = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);

        hasCopied.value = true;

        toaster.success('Text copied to clipboard!');

        setTimeout(() => {
          hasCopied.value = false;
        }, resetDelay);
      } else {
        throw new Error('Clipboard API not supported');
      }
    } catch (error) {
      toaster.error('Failed to copy text.');

      console.error('Failed to copy text:', error);
    }
  };

  return { copy, hasCopied };
}
