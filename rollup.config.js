import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      name: 'Honeycomb',
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [typescript()],
}
