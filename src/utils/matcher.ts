import { pathToRegexp } from 'path-to-regexp'

export function findMathingMock(method: string, path: string, mocks: Record<string, any>) {
  const entries = Object.entries(mocks)

  for (const [key, value] of entries) {
    const [mockedMethod, mockPath] = key.split(' ')

    if (mockedMethod !== method) continue

    const regex = pathToRegexp(mockPath)

    if (regex.regexp.test(path)) {
      return value
    }
  }

  null
}
