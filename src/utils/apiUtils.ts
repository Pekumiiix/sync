import type { AxiosError } from 'axios';

import api from '@/services/http.service';

export async function apiRequest<TResponse, TData = unknown>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  endpoint: string,
  data?: TData
): Promise<TResponse> {
  try {
    const res = await api.request<TResponse>({
      method,
      url: endpoint,
      ...(data ? { data } : {})
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    const customError = new Error(
      err.response?.data?.message || err.message || 'An unexpected error occurred'
    );

    (customError as unknown as { cause: unknown }).cause = error;

    throw customError;
  }
}
