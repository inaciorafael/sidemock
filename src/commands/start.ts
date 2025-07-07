import express, { Request, Response } from 'express'
import { loadMocks, getMock, showMockExample } from '../utils/mocks'
import { proxyRequest } from '../utils/proxy'
import { getConfig } from '../config'

import chalk from 'chalk'

export function startServer() {
  const { port } = getConfig()
  const app = express()
  loadMocks()

  app.use(express.json())

  // @ts-ignore
  app.use(async (req: Request, res: Response) => {
    const mock = getMock(req)

    if (mock) {
      console.log(chalk.yellow(`[MOCK] ${req.method} ${req.path}`))

      const data = mock.data ?? mock
      const responseDelayMs = mock.delay ?? null

      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Credentials', 'true')

      if (responseDelayMs) {
        setTimeout(() => {
          return res.status(200).json(data)
        }, responseDelayMs)
        return
      }

      return res.status(200).json(data)
    }

    await proxyRequest(req, res)
  })

  app.listen(port, () => {
    const { backendUrl } = getConfig()

    console.log(chalk.white(`✅ Redirecionamento para o backend real: ${chalk.cyan(backendUrl)}`))
    console.log(chalk.white(`✅ Redirecionamento para sidemock ${chalk.cyan(`http://localhost:${port}`)}`))
    console.log('')

    showMockExample()
  })
}
