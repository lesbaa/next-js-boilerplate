/* eslint-disable no-param-reassign */

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
  webpack: (config, { dev }) => {
    // the following is to allow the modules to access their filename for links
    config.context = __dirname
    config.node = {
      ...config.node,
      __filename: true,
    }
    if (!dev) {
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          filename: 'sw.js',
          verbose: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          staticFileGlobs: [
            'static/fonts',
            'static/img/**.*',
            'static/img/**/*',
          ],
          runtimeCaching: [
            {
              handler: 'networkFirst',
              urlPattern: /^https?.*/,
            },
          ],
        })
      )
    }
    return config
  },
}
