/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    include: ['tests/integration/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    css: false,
    // Mock modules that are not available in jsdom
    server: {
      deps: {
        inline: ['@docusaurus/core', '@docusaurus/theme-classic']
      }
    }
  },
  resolve: {
    alias: {
      '@site': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src')
    }
  }
})