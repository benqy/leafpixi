import type { Options } from 'tsup'

const config: Options = {
  entry: ['index.ts'],
  dts: true,
  sourcemap: true,
  format: ['cjs', 'esm'],
  clean: true,
}

export default config
