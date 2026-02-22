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

  /**
   * Request template for all requests
   * @param {FetchProps} props - The request properties
   * @returns {Promise<FetchResponse<T>>} - The response from the server
   */
  private async requestTemplate<T>({
    path, method, body, options
  }: FetchProps): Promise<FetchResponse<T>> {

    const HEADERS = new Headers();
    if (options?.contentType !== 'form') {
      HEADERS.append('Content-Type', 'application/json');
    }

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

  /**
   * GET request
   * @param {RequestProps} props - The request properties
   * @returns {Promise<FetchResponse<T>>} - The response from the server
   */
  async get<T>({ path, options }: RequestProps) {
    return await this.requestTemplate<T>({ path, method: 'GET', options });
  }

  /**
   * POST request
   * @param {RequestProps} props - The request properties
   * @returns {Promise<FetchResponse<T>>} - The response from the server
   */
  async post<T>({ path, body, options }: RequestProps) {
    return await this.requestTemplate<T>({ path, method: 'POST', body, options });
  }

  /**
   * PUT request
   * @param {RequestProps} props - The request properties
   * @returns {Promise<FetchResponse<T>>} - The response from the server
   */
  async put<T>({ path, body, options }: RequestProps) {
    return await this.requestTemplate<T>({ path: path ?? '/', method: 'PUT', body, options });
  }

  /**
   * DELETE request
   * @param {RequestProps} props - The request properties
   * @returns {Promise<FetchResponse<T>>} - The response from the server
   */
  async del<T>({ path, body, options }: RequestProps) {
    return await this.requestTemplate<T>({ path, method: 'DELETE', body, options });
  }
}