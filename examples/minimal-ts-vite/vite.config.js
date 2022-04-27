const { resolve } = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        quickStart: resolve(__dirname, 'examples/quick-start/index.html'),
      },
    },
  },
});
