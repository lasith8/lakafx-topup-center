import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/proxy/chamindu': {
        target: 'https://api.chamindu.site/api/v1/freefire',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/chamindu/, '')
      },
      '/proxy/render': {
        target: 'https://free-ff-api-src-5plp.onrender.com/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/render/, '')
      }
    }
  }
})