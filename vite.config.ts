/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "^.+\\.svg$": path.resolve(__dirname, "./src/__mocks__/svg.js"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/components/ui/**',
        '**/lib/utils.ts',
        '**/main.tsx',
        '**/vite-env.d.ts',
        '**/__mocks__/**',
        '**/routes/**',
        '**/router.tsx'
      ],
      thresholds: {
        lines: 95,
        functions: 95,
        branches: 95,
        statements: 95
      }
    }
  }
})
