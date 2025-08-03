import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api/books': {
        target: 'https://openlibrary.org',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/books/, '/search.json'),
      },
      '/api/works': {
        target: 'https://openlibrary.org',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/works/, '/works'),
      },
      '/api/authors': {
        target: 'https://openlibrary.org',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/authors/, '/authors'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
});
