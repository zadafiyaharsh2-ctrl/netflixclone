import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  // Add this for SPA routing
  server: {
    historyApiFallback: true,
  }
})