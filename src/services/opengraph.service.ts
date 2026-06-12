import axios from 'axios';

import type { IOpenGraphResponse } from '@/types/opengraph.type';

class OpenGraphService {
  async fetchOpenGraphData(url: string): Promise<IOpenGraphResponse | null> {
    try {
      const res = await axios.get(`/og-api/api/v1/og?url=${encodeURIComponent(url)}`);

      return res.data;
    } catch (error) {
      console.error('Failed to fetch OpenGraph data:', error);

      return null;
    }
  }
}

export const openGraphService = new OpenGraphService();
