import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/chamindu': {
        target: 'https://api.chamindu.site/api/v1/freefire',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chamindu/, '')
      },
      '/api/render': {
        target: 'https://free-ff-api-src-5plp.onrender.com/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/render/, '')
      }
    }
  }
})