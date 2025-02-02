import axios, { AxiosError } from 'axios';

export interface IApiResponse<T = IFilm[]> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

export interface IApiError {
  message: string;
  code?: number;
  details?: Record<string, unknown>;
}

export type IResponse<T = IFilm[]> =
  | { status: 'success'; data: IApiResponse<T>; timestamp: number }
  | { status: 'error'; error: IApiError; timestamp: number };

export interface IFilm {
  title: string;
  opening_crawl: string;
  director: string;
}

const apiClient = axios.create({
  baseURL: 'https://swapi.dev/api/',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const SearchAPI = async (query?: string, signal?: AbortSignal) => {
  try {
    const { data } = await apiClient.get<IApiResponse>('films/', {
      params: { search: query },
      signal,
    });

    return {
      status: 'success' as const,
      data: {
        ...data,
        count: data.count ?? 0,
        next: data.next ?? null,
        previous: data.previous ?? null,
        results: data.results,
      },
      timestamp: Date.now(),
    };
  } catch (error) {
    const axiosError = error as AxiosError<IApiError>;

    return {
      status: 'error' as const,
      error: {
        message: axiosError.response?.data?.message || axiosError.message,
        code: axiosError.response?.status,
        details: axiosError.response?.data?.details,
      },
      timestamp: Date.now(),
    };
  }
};
