import type { ZodSchema } from "zod"

export type HttpRequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface HttpResponse <T = any> {
  ok: boolean
  status: number
  data?: T
  error: boolean
}

export type HttpHandler = (
  url: string,
  init?: RequestInit & { body?: any }
) => Promise<HttpResponse>

export type HttpRequest = RequestInit & { url: string }

export type HttpRequestInterceptor = (req: HttpRequest) => Promise<HttpRequest> | HttpRequest
export type HttpResponseInterceptor<T = any> = (res: HttpResponse<T>) => Promise<HttpResponse<T>> | HttpResponse<T>

export type RequestOptions<TPayload, TResponse> = {
  body?: TPayload
  init?: RequestInit
  payloadSchema?: ZodSchema<TPayload>
  responseSchema?: ZodSchema<TResponse>
  defaultData?: TResponse
}
