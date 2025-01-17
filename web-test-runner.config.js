import { esbuildPlugin } from '@web/dev-server-esbuild';
import rollupAlias from '@rollup/plugin-alias';
import rollupReplace from '@rollup/plugin-replace';
import rollupCommonjs from '@rollup/plugin-commonjs';
import { fromRollup } from '@web/dev-server-rollup';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';
import { browserstackLauncher } from '@web/test-runner-browserstack';
import { jasmineTestRunnerConfig } from 'web-test-runner-jasmine';

const aliasPlugin = fromRollup(rollupAlias);
const replacePlugin = fromRollup(rollupReplace);
const commonjsPlugin = fromRollup(rollupCommonjs);

const IS_CI = process.argv.includes('--ci');

const sharedCapabilities = {
  'browserstack.user': process.env.BROWSERSTACK_USER,
  'browserstack.key': process.env.BROWSERSTACK_KEY,
  project: 'CAI SDK',
  build: process.env.GITHUB_REF || 'local',
  acceptSslCerts: true,
};

export default {
  ...jasmineTestRunnerConfig(),
  nodeResolve: true,

  // Tests must run in a secure context to allow access to restricted browser APIs. Localhost is treated as secure,
  // so for local testing we do not need SSL. However, tests run on browserstack require SSL to be enabled.
  // http2 must be set for web-test-runner/web-dev-server to support SSL
  http2: IS_CI,
  protocol: IS_CI ? 'https:' : 'http:',

  groups: [
    // {
    //   name: 'react-hooks',
    //   files: 'packages/react-hooks/test/**/*.spec.ts',
    // },
    {
      name: 'c2pa',
      files: 'packages/c2pa/test/**/*.spec.ts',
    },
    {
      name: 'toolkit',
      files: 'packages/toolkit/test/**/*.spec.ts',
    },
    {
      name: 'c2pa-wc',
      files: 'packages/c2pa-wc/test/**/*.spec.ts',
    },
  ],

  plugins: [
    esbuildPlugin({
      ts: true,
      tsx: true,
    }),
    commonjsPlugin({
      include: [
        // Allows @testing-library/react-hooks to be consumed as an ES module
        'node_modules/@testing-library/**/*',
        'node_modules/react-dom/**/*',
        'node_modules/object-assign/**/*',
        'node_modules/scheduler/**/*',
        'node_modules/prop-types/**/*',
      ],
    }),
    aliasPlugin({
      entries: {
        // Alias react at test-time to a pre-built ESM version so WTR can consume it. For the time being,
        // @rollup/plugin-commonjs (as used by WTR) is not able to transform React to ESM at runtime. Hopefully
        // this changes with new releases of the CJS plugin or a future version of React is shipped as an ES module.
        react: '@esm-bundle/react',
      },
    }),
    replacePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      preventAssignment: true,
    }),
  ],

  testsStartTimeout: 30000,

  browsers: IS_CI
    ? [
        browserstackLauncher({
          capabilities: {
            ...sharedCapabilities,
            name: 'Functional tests [OS X chrome latest]',
            os: 'OS X',
            os_version: 'Big Sur',
            browserName: 'chrome',
            browser_version: 'latest',
          },
        }),

        browserstackLauncher({
          capabilities: {
            ...sharedCapabilities,
            name: 'Functional tests [OS X firefox latest]',
            os: 'OS X',
            os_version: 'Big Sur',
            browserName: 'firefox',
            browser_version: 'latest',
          },
        }),

        browserstackLauncher({
          capabilities: {
            ...sharedCapabilities,
            name: 'Functional tests [Win 10 edge latest]',
            os: 'windows',
            os_version: '10',
            browserName: 'edge',
            browser_version: 'latest',
          },
        }),

        // browserstackLauncher({
        //   capabilities: {
        //     ...sharedCapabilities,
        //     name: 'Functional tests [safari latest]',
        //     browserName: 'safari',
        //     browser_version: 'latest',
        //   },
        // }),
      ]
    : [
        puppeteerLauncher({
          launchOptions: {
            ignoreHTTPSErrors: true,
          },
        }),
      ],
};
