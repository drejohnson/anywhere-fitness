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

    [
      '@snowpack/plugin-run-script',
      {cmd: 'svelte-check --output human', watch: '$1 --watch', output: 'stream'},
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
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};
