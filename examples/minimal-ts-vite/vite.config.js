const { resolve } = require('path');
const { defineConfig } = require('vite');
const fg = require('fast-glob');

const input = fg.sync('examples/**/index.html').reduce((acc, path) => {
  const key = path.split('/')[1];
  return {
    ...acc,
    [key]: resolve(__dirname, path),
  };
}, {});

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input,
    },
  },
});
