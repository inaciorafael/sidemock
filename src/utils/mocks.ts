import { Request } from 'express'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { findMathingMock } from '../utils/matcher'
import { getConfig } from '../config'

const MOCKS_PATH = path.join(process.cwd(), 'mocks.json')
let MOCKS: Record<string, any> = {}

const line = console.log

function parseMilliseconds(ms: number) {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const milliseconds = ms % 1000

  return { minutes, seconds, milliseconds }
}

function formatDuration(ms: number): string {
  const { minutes, seconds, milliseconds } = parseMilliseconds(ms)
  const parts = []

  if (minutes) parts.push(`${minutes}min`)
  if (minutes || seconds) parts.push(`${seconds}seg`)
  parts.push(`${milliseconds}ms`)

  return parts.join(':')
}

export function loadMocks(): void {
  if (!fs.existsSync(MOCKS_PATH)) {
    console.warn(chalk.red('Arquivo mocks.json não encontrado.'))
    return
  }

  const parse = (): void => {
    try {
      const raw = fs.readFileSync(MOCKS_PATH, 'utf-8')
      MOCKS = JSON.parse(raw)

      line()

      const mockList = Object.entries(MOCKS).map(([key, value]) => {
        const [method, url] = key.split(' ')
        return {
          Método: method,
          URL: url,
          Delay: formatDuration(value.delay || 0),
          Tipo: typeof value,
        }
      })

      if (mockList.length > 0) {
        console.log(chalk.white('📦 Mocks carregados:'))
        line()
        console.table(mockList)
        return
      }

      console.log(chalk.red('Nenhum mock configurado.'))
      console.log(chalk.yellow('Configure seus mocks no arquivo mocks.json'))
      line()
    } catch(error) {
      console.error(chalk.red('Erro ao carregar mocks.json:'), error)
    }
  }

  parse()

  fs.watchFile(MOCKS_PATH, { interval: 1000 }, () => {
    console.log(chalk.magenta('📂 mocks.json modificado. Recarregando...'))
    parse()
  })
}

export function showMockExample() {
  const { port } = getConfig()
  const mockExamplePath = 'GET /api/example/users/:id/profile'

  if (MOCKS[mockExamplePath]) {
    console.log(chalk.bold(`Cole no seu navegador para testar se está funcionando: ${chalk.cyan(`http://localhost:${port}/api/example/users/123/profile`)}`))
  }
}

export function getMock(req: Request) {
  const mock = findMathingMock(req.method, req.path, MOCKS)

  return mock
}
