import { useMutation } from '@tanstack/vue-query';

import { openGraphService } from '@/services/opengraph.service';

export function useOpenGraph() {
  return useMutation({
    mutationFn: (url: string) => openGraphService.fetchOpenGraphData(url)
  });
}
