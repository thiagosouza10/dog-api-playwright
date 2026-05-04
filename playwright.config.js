import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 6,

  reporter: [
    ['line'],
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: 'https://dog.ceo',
    extraHTTPHeaders: {
      "Content-Type": "application/json"
    }
  }
});