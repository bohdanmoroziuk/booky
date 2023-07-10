/* eslint-disable max-len */

import axios, { AxiosInstance } from 'axios';

import { HttpClient, RequestConfig } from 'src/shared/ports';

export class AxiosHttpClient implements HttpClient {
  private http: AxiosInstance;

  constructor(baseUrl: string) {
    this.http = axios.create({
      baseURL: baseUrl,
    });
  }

  async get<T>(url: string, config?: RequestConfig | undefined): Promise<T> {
    const response = await this.http.get(url, config);

    return response.data;
  }

  async delete<T>(url: string, config?: RequestConfig | undefined): Promise<T> {
    const response = await this.http.delete(url, config);

    return response.data;
  }

  async post<T, D>(url: string, data?: D | undefined, config?: RequestConfig | undefined): Promise<T> {
    const response = await this.http.post(url, data, config);

    return response.data;
  }

  async put<T, D>(url: string, data?: D | undefined, config?: RequestConfig | undefined): Promise<T> {
    const response = await this.http.put(url, data, config);

    return response.data;
  }
}
