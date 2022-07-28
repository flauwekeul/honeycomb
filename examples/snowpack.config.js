// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  workspaceRoot: '../..',
  mount: {
    public: { url: '/', static: true },
    root: '/',
    'line-of-sight': '/line-of-sight',
  },
}
