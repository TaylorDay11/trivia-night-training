import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('dir/assets/index-bl5mcz2k.js')) {
            return false;
          }
        }
      }
    }
  }
}) 

