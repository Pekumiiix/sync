import { ref } from 'vue';

export function useClipboard(resetDelay = 2000) {
  const hasCopied = ref(false);

  const copy = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        hasCopied.value = true;

        setTimeout(() => {
          hasCopied.value = false;
        }, resetDelay);
      } else {
        throw new Error('Clipboard API not supported');
      }
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return { copy, hasCopied };
}
