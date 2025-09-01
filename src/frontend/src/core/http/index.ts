import { HttpClient } from './http-client'
import { env } from '../env'
import { fetchAdapter } from './adapters/fetchAdapter'

export const http = new HttpClient({
  baseUrl: env.API_BASE_URL,
  retries: 1,
  handler: fetchAdapter,
  retryDelayMs: 100,
})

http.addRequestInterceptor(async (req) => {
  return {
    ...req,
    headers: {
      ...req.headers,
      Authorization: "Bearer MEU_TOKEN_AQUI",
    },
  }
})

http.addResponseInterceptor(async (res) => {
  return {
    ...res,
    data: res.data ?? null,
  }
})
