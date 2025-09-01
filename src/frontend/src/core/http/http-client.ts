import { ApiError } from './errors'
import { sleep } from './retry'
import type { HttpHandler, HttpRequest, HttpRequestInterceptor, HttpRequestMethods, HttpResponse, HttpResponseInterceptor, RequestOptions } from './types'

export type HttpClientOptions = {
  baseUrl: string
  headers?: Record<string, string>
  handler: HttpHandler
  retries?: number
  retryDelayMs?: number
}

export class HttpClient {
  private baseUrl: string
  private headers: Record<string, string>
  private handler: HttpHandler
  private retries: number
  private retryDelayMs: number

  private requestInterceptors: HttpRequestInterceptor[] = []
  private responseInterceptors: HttpResponseInterceptor[] = []

  constructor(opts: HttpClientOptions) {
    this.baseUrl = opts.baseUrl.replace(/\/$/, '')
    this.headers = opts.headers ?? { "Content-Type": "application/json" }
    this.handler = opts.handler
    this.retries = opts.retries ?? 0
    this.retryDelayMs = opts.retryDelayMs ?? 0
  }

  addRequestInterceptor(interceptor: HttpRequestInterceptor) {
    this.requestInterceptors.push(interceptor)
  }

  addResponseInterceptor(interceptor: HttpResponseInterceptor) {
    this.responseInterceptors.push(interceptor)
  }

  private async runRequestInterceptors(req: HttpRequest): Promise<HttpRequest> {
    let result = req
    for (const interceptor of this.requestInterceptors) {
      result = await interceptor(result)
    }

    return result
  }

  private async runResponseInterceptors<T>(res: HttpResponse<T>): Promise<HttpResponse<T>> {
    let result = res
    for (const interceptor of this.responseInterceptors) {
      result = await interceptor(result)
    }

    return result
  }

  private async request<TResponse, TPayload = unknown>(
    method: HttpRequestMethods,
    path: string,
    options: RequestOptions<TPayload, TResponse>,
  ): Promise<HttpResponse<TResponse>> {
    const url = `${this.baseUrl}${path}`

    let payload = options.body
    if (options.payloadSchema && payload !== undefined) {
      const parsed = options.payloadSchema.safeParse(payload)
      if (!parsed.success) {
        throw new Error('Payload inválido: ' + JSON.stringify(parsed.error.format()))
      }
      payload = parsed.data
    }

    let req: HttpRequest = {
      url,
      method,
      headers: { ...this.headers, ...options.init?.headers },
      body: options.body != null ? JSON.stringify(options.body) : undefined,
      ...options.init,
    }

    req = await this.runRequestInterceptors(req)

    let lastErr: unknown

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        let res = await this.handler(req.url, req)

        if (!res.ok) {
          throw new ApiError(res.status, res.data)
        }

        if (options.responseSchema && res.data !== undefined) {
          const parsed = options.responseSchema.safeParse(res.data)

          if (!parsed.success) {
            throw new Error('Response inválida: ' + JSON.stringify(parsed.error.format()))
          }
          res.data = parsed.data
        }

        if (res.data === undefined && options.defaultData !== undefined) {
          res.data = options.defaultData;
        }

        res = await this.runResponseInterceptors(res)

        return res as HttpResponse<TResponse>
      } catch(err) {
        lastErr = err
        const retriable = err instanceof ApiError
          ? err.status >= 500
          : true

        if (attempt < this.retries && retriable) {
          if (this.retryDelayMs) await sleep(this.retryDelayMs)
          continue
        }

        throw err
      }
    }

    throw lastErr
  }

  get<TResponse, TPayload = unknown>(
    path: string,
    options: RequestOptions<TPayload, TResponse> = {}
  ) {
    return this.request<TResponse, TPayload>('GET', path, options);
  }

  post<TResponse, TPayload = unknown>(
    path: string,
    options: RequestOptions<TPayload, TResponse> = {}
  ) {
    return this.request<TResponse, TPayload>('POST', path, options);
  }

  put<TResponse, TPayload = unknown>(
    path: string,
    options: RequestOptions<TPayload, TResponse> = {}
  ) {
    return this.request<TResponse, TPayload>('PUT', path, options);
  }

  patch<TResponse, TPayload = unknown>(
    path: string,
    options: RequestOptions<TPayload, TResponse> = {}
  ) {
    return this.request<TResponse, TPayload>('PATCH', path, options);
  }

  delete<TResponse, TPayload = unknown>(
    path: string,
    options: RequestOptions<TPayload, TResponse> = {}
  ) {
    return this.request<TResponse, TPayload>('DELETE', path, options);
  }
}
