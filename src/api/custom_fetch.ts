import { FetchProps, RequestProps, FetchResponse } from "@/models";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const SERVER = process.env.NEXT_PUBLIC_API_URL;

export default class CustomFetch {

  private prefix: string = '';

  constructor(prefix?: string) {
    if (!API_TOKEN || !SERVER) {
      throw new Error('API_TOKEN or SERVER is not defined');
    }
    if (prefix) {
      this.prefix = prefix;
    }
  }

  private async requestTemplate<T>({
    path, method, body, options
  }: FetchProps): Promise<FetchResponse<T>> {

    const HEADERS = new Headers();

    const REQUEST_OPTIONS = {
      headers: HEADERS,
      method,
      body: options?.contentType === 'form' ? body : JSON.stringify(body),
      credentials: 'include' as RequestCredentials
    }

    const response = await fetch(
      `${SERVER}${this.prefix}${path}`,
      REQUEST_OPTIONS
    )

    const data = await response.json();

    return {
      data,
      status: response.status,
      statusText: response.statusText
    }
  }

  async get<T>({ path, options }: RequestProps) {
    return await this.requestTemplate<T>({ path, method: 'GET', options });
  }

  async post<T>({ path, body, options }: RequestProps) {
    return await this.requestTemplate<T>({ path, method: 'POST', body, options });
  }

  async put<T>({ path, body, options }: RequestProps) {
    return await this.requestTemplate<T>({ path: path ?? '/', method: 'PUT', body, options });
  }

  async del<T>({ path, body, options }: RequestProps) {
    return await this.requestTemplate<T>({ path, method: 'DELETE', body, options });
  }
}