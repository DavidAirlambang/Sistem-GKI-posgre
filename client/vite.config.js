import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    chunkSizeWarningLimit: 10000
  },
  sourcemap: true,
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // #target tergantung di deploy dimana
        target: 'http://localhost:5000/api',
        // target: 'http://34.101.188.146:5000/api'
        // target: 'http://api-proker.gkitamancibunut.org/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
