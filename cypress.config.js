const { defineConfig } = require('cypress')
const fs = require('fs-extra');

module.exports = defineConfig({
  projectId: 'fizr9e',
  e2e: {
    // Configure your E2E tests here
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: "https://store.steampowered.com/",
    defaultCommandTimeout: 10000,
    video: true,
    setupNodeEvents(on, config) {
      on('task', {
        deleteFolder({path}) {
          console.log(`Deleting folder: ${path}`);
          return fs.remove(path);
        }
      })
    }
  },

  env: {
    locale: process.env.CYPRESS_LOCALE || 'en-EN',
  }
})