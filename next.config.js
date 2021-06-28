const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  // pageExtensions: ["page.tsx"],
  // webpack: (config, { webpack }) => {
  //   config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
  //   return config;
  // }
};
