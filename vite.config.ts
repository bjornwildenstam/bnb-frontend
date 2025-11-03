import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  cacheDir: 'vite-cache',           // flytta cache från node_modules/.vite
  plugins: [react()],
  resolve: { alias: { '@': '/src' } },
  server: {
    proxy: {
      // Om du kör lokalt backend: låt bli proxy.
      // Om du vill proxya till Vercel, fyll i target:
      // '/api': { target: 'https://<din-backend>.vercel.app/api', changeOrigin: true, secure: true },
    },
  },
})