export interface RequestProps<T> {
  path?: string;
  body?: object | T;
  options?: object;
}

export interface FetchProps<T> extends RequestProps<T> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export interface FetchResponse<T> {
  data: T;
  status: number;
  statusText: string;
}