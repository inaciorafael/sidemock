import { Command } from 'commander'
import { startServer } from './commands'
import { setConfig } from './config'

export function runCLI() {
  const program = new Command()

  program
    .name('sidemock')
    .version('1.0.0')
    .description('Mocka endpoints especificos ao lado dos endpoints reais')

  program
    .name('start')
    .description('Inicia o servidor mock/backend')
    .requiredOption('-b, --backend <url>', 'Url do backend real')
    .option('-p, --port <port>', 'Porta do servidor sidemock', '5000')
    .option('-d, --delay <miliseconds>', 'Delay para resolver as requisições mockadas', '0ms')
    .action(({ backend, delay }) => {
      if (backend) {
        setConfig({
          backendUrl: backend,
        })
      }

      if (delay) {
        setConfig({
          delay
        })
      }

      startServer()
    })

  program.parse()
}
