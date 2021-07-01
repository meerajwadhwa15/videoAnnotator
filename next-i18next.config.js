/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    localePath: path.resolve('./public/locales'),
  },
};
