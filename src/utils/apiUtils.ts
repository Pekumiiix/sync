import type { AxiosError } from 'axios';

import api from '@/services/http.service';
import type { IApiResponse } from '@/types/api.type';

export class ApiError extends Error {
  statusCode?: number;
  originalError?: AxiosError;

  constructor(message: string, statusCode?: number, originalError?: AxiosError) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

export async function apiClient<TResponse, TData = unknown>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  endpoint: string,
  data?: TData
): Promise<TResponse> {
  try {
    const requestPayload = data && method === 'get' ? { params: data } : data ? { data } : {};

    const res = await api.request<TResponse>({
      method,
      url: endpoint,
      ...requestPayload
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError<IApiResponse<null>>;

    const errorMessage =
      err.response?.data?.message || err.message || 'An unexpected error occurred';

    const statusCode = err.response?.status;

    throw new ApiError(errorMessage, statusCode, err);
  }
}
