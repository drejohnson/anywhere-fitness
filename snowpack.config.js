/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-optimize',

    [
      '@snowpack/plugin-run-script',
      {cmd: 'svelte-check --output human --ignore "lib,functions,api,fql"', watch: '$1 --watch', output: 'stream'},
    ],

    [
      "snowpack-plugin-rollup-bundle",
      {
        emitHtmlFiles: false,
        preserveSourceFiles: true,
        // equivalent to inputOptions.input from Rollup
        entrypoints: "build/_dist_/index.js",
      }
    ]
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
    "@stores": "./src/stores",
    "@utils": "./src/utils",
    "@api": "./api",
    "@lib": "./lib",
    "@types": "./types"
  },
};
