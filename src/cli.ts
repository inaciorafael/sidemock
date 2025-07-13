import { Command } from 'commander'
import { startServer } from './commands'
import { setConfig } from './config'
import chalk from 'chalk'

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
    .option('--record-all', 'Salva as respostas das requisições feitas e adiciona no arquivo mock.json para uso futuro.')
    .action(({ backend, delay, recordAll }) => {
      if (recordAll) {
        setConfig({
          record: recordAll,
        })

        console.log('')
        console.log(chalk.bgCyan('Gravação de todos os enpoints ativada'))
      }

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
