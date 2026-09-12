import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://20.187.120.80:8000',
        changeOrigin: true,
      },
      '/static': {
        target: 'http://20.187.120.80:8000',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://20.187.120.80:8000',
        changeOrigin: true,
      },
    },
  },
})
