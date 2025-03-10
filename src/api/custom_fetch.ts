const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const HEADERS = new Headers();
HEADERS.append("x-api-key", API_TOKEN || '');

export default class CustomFetch {
  constructor() {
    if (!API_TOKEN || !API_URL) {
      throw new Error('API_TOKEN or API_URL is not defined');
    }
  }

  private fetchTemplate<T>(path: string, method: 'GET' | 'POST' | 'PUT', body?: object | T) {
    return fetch(
      `${API_URL}/${path}`,
      {
        headers: HEADERS,
        method,
        ...( body && { body: JSON.stringify(body) } )
      }
    )
  }

  async get<T>(path: string, body?: object | T) {
    return await (await this.fetchTemplate(path, 'GET', body)).json();
  }

  async post<T>(path: string, body?: object | T) {
    return await (await this.fetchTemplate(path, 'POST', body)).json();
  }

  async put<T>(path: string, body?: object | T) {
    return await (await this.fetchTemplate(path, 'PUT', body)).json();
  }
}