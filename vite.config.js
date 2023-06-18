import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-utils/setup.js'],
    testMatch: ['**/*.test.{js,jsx}'],
    coverage: {
      reporter: ['text'],
      exclude: ['node_modules/', './src/test-utils'],
    },
  },
})
