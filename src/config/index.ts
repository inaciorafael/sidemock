export interface AppConfig {
  port: number
  backendUrl: string
  delay: 0
}

let config: AppConfig = {
  port: 5000,
  backendUrl: '',
  delay: 0
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
