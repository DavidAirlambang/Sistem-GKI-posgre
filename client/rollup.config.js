// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/App.tsx', // Adjust the entry point according to your project structure
  output: {
    file: 'dist/bundle.js', // Adjust the output file and path as needed
    format: 'esm'
  },
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'] // Add TypeScript extensions
    }),
    commonjs(),
    typescript(),
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    })
  ]
}
