/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const { i18n } = require('./next-i18next.config');

const isMock = !!process.env.MOCK && process.env.NODE_ENV !== 'production';

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
  publicRuntimeConfig: {
    isMock,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://13.82.120.142:8080/:path*',
      },
    ];
  },
};
