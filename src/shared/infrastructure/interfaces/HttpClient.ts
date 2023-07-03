export type RequestUrl = string;

export interface RequestConfig {
  params: unknown;
}

export interface HttpClient {
  get<T>(url: RequestUrl, config?: RequestConfig): Promise<T>;
  delete<T>(url: RequestUrl, config?: RequestConfig): Promise<T>;
  post<T, D>(url: RequestUrl, data?: D, config?: RequestConfig): Promise<T>;
  put<T, D>(url: RequestUrl, data?: D, config?: RequestConfig): Promise<T>;
}
