/** @type {import("snowpack").SnowpackUserConfig } */
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    ["@snowpack/plugin-optimize", {
      preloadModules: true,
      preloadCSS: true,
      target: 'es2018'
    }],

    [
      '@snowpack/plugin-run-script',
      {cmd: 'svelte-check --output human --ignore "lib,functions,api,fql"', watch: '$1 --watch', output: 'stream'},
    ],

    // [
    //   "snowpack-plugin-rollup-bundle",
    //   {
    //     emitHtmlFiles: true,
    //     preserveSourceFiles: true,
    //     // equivalent to inputOptions.input from Rollup
    //     entrypoints: "build/_dist_/index.js",
    //     extendConfig: (config) => {
    //       config.inputOptions.plugins.push(
    //         {
    //           name: 'copy-assets',
    //           generateBundle() {
    //             fs.copySync(
    //               path.resolve('./public'),
    //               path.resolve('./build'), {
    //                 dereference: true,
    //                 filter: file => file !== path.resolve('public/index.html')
    //               }
    //             );
    //           }
    //         }
    //       )
    //       return config
    //     }
    //   }
    // ]
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    // don't open browser
    open: 'none',
    // don't clear the output
    output: 'stream'
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    "@app": "./src",
    "@components": "./src/components",
    "@routes": "./src/routes",
    "@stores": "./src/stores",
    "@auth": "./src/auth",
    "@actions": "./src/actions",
    "@utils": "./src/utils",
    "@api": "./api",
    "@lib": "./lib",
    "@types": "./types"
  },
};

