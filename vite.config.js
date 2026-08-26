import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/todos': 'http://localhost:3000',
      '/events': 'http://localhost:3000',
      '/lists': 'http://localhost:3000',
      '/capacity-check': 'http://localhost:3000',
      '/weekend-planner': 'http://localhost:3000',
      '/task-cleanup': 'http://localhost:3000',
      '/health': 'http://localhost:3000',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
    files: './tests/**/*.test.jsx',
  },
})
