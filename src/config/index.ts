export interface AppConfig {
  port: number
  backendUrl: string
  delay: 0,
  record: boolean
}

let config: AppConfig = {
  port: 5000,
  backendUrl: '',
  delay: 0,
  record: false
}

export function setConfig(newConfig: Partial<AppConfig>) {
  config = {
    ...config,
    ...newConfig
  }
}

export function getConfig(): AppConfig {
  return config
}
