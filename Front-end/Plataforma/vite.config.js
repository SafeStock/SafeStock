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
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom']
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: '/login',
    hmr: {
      clientPort: 5173
    },
    proxy: {
      '/api': {
        target: 'http://sf-backend-1:8080',
        changeOrigin: true,
        secure: false
      }
    },
    watch: {
      usePolling: true
    }
  }
})
