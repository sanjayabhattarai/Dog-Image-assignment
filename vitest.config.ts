import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    // Exclude Playwright test files and only run server tests
    include: ['server/tests/**/*.test.ts'],
    exclude: [
      'node_modules',
      'dist',
      'tests/**/*.spec.ts',        // Exclude root level Playwright tests
      'server/tests/**/*.spec.ts',  // Exclude server Playwright E2E tests
    ],
  },
});
