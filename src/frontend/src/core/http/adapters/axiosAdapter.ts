import axios from 'axios'
import type { HttpHandler } from '../types'

export const axiosAdapter: HttpHandler = async (url, init) => {
  try {
    const res = await axios({
      url,
      method: init?.method,
      headers: init?.headers,
      data: init?.body
    } as any)

    const ok = res.status >= 200 && res.status < 300

    return {
      ok,
      status: res.status,
      data: res.data,
      error: !ok
    }
  } catch(err: any) {
    if (err.response) {
      return {
        ok: false,
        status: err.response.status,
        data: err.response.data,
        error: true,
      }
    }

    return {
      ok: false,
      status: 0,
      data: undefined,
      error: true,
    }
  }
}
