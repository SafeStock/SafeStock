import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()]
    }
  },
  server: {
    port: 5173,
    open: '/login',
    proxy: {
      '/api': {
        target: 'http://sf-backend-1:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
