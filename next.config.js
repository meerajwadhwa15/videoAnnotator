/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    return config;
  },
  i18n,
  dir: '/src',
};
