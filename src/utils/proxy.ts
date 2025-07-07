import axios, { AxiosRequestConfig } from 'axios'
import { Request, Response } from 'express'
import { getConfig } from '../config'

export async function proxyRequest(req: Request, res: Response) {
  const { backendUrl } = getConfig()

  const targetUrl = backendUrl + req.originalUrl
  console.log(`[PROXY] ${req.method} ${targetUrl}`)

  try {
    const config: AxiosRequestConfig = {
      method: req.method as AxiosRequestConfig['method'],
      url: targetUrl,
      headers: {
        ...req.headers,
        host: new URL(backendUrl).host,
      },
      data: req.body,
      validateStatus: () => true
    }

    const response = await axios(config)

    res.status(response.status)

    for (const [key, value] of Object.entries(response.headers)) {
      if (value !== undefined) res.setHeader(key, value as string)
    }

    if (typeof response.data === 'object') {
      res.json(response.data)
      return
    }

    res.send(response.data)
  } catch(error) {
    console.error('[ERRO NO PROXY]', error)
    res.status(502).json({ error: 'Erro ao redirecionar para API real.' })
  }
}
