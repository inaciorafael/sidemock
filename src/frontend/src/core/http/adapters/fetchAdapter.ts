import type { HttpHandler } from "../types";

export const fetchAdapter: HttpHandler = async (url, init) => {
  const res = await fetch(url, init)
  const text = await res.text()
  let data: any

  try {
    data = text ? JSON.parse(text) : undefined
  } catch {
    data = text
  }

  return {
    ok: res.ok,
    status: res.status,
    data,
    error: !res.ok
  }
}
