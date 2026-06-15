import type { AxiosError } from 'axios';

import api from '@/services/http.service';
import type { IApiResponse } from '@/types/api.type';

export async function apiClient<TResponse, TData = unknown>(
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
    const err = error as AxiosError<IApiResponse<unknown>>;

    const errorMessage =
      err.response?.data?.message || err.message || 'An unexpected error occurred';

    const customError = new Error(errorMessage);

    Object.assign(customError, { cause: error });

    throw customError;
  }
}
