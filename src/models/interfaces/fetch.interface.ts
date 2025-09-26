export interface OptionsRequest {
  contentType: 'json' | 'form';
}

export interface RequestProps {
  path?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: BodyInit | string | any;
  options?: OptionsRequest;
}

export interface FetchProps extends RequestProps {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export interface FetchResponse<T> {
  data: T;
  status: number;
  statusText: string;
}
