import type { Options } from 'tsup'

const config: Options = {
  entry: {
    index: 'src/index.ts',
    // 添加其他模块的入口，例如:
    utils: 'utils/index.ts',
    components: 'components/index.ts',
  },
  treeshake: true,
  dts: true,
  // splitting:false,
  sourcemap: true,
  format: ['cjs', 'esm'],
  outDir:'./dist',
  clean: true,
}

export default config
