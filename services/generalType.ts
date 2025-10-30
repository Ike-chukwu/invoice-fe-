export type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
  error: string;
};

export type PaginatedApiResponse<T> = {
  status: string;
  message: string;
  _metadata: {
    page: string;
    perpage: string;
    page_count: number;
    total_count: number;
  };
  data: T;
  error: string;
};
