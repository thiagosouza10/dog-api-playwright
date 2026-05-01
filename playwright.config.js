import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 5,

  reporter: [
    ['line'],
    ['html', { open: 'always' }]
  ],

  use: {
    baseURL: 'https://dog.ceo',
    extraHTTPHeaders: {
      "Content-Type": "application/json"
    }
  }
});