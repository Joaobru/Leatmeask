const { override, addBabelPlugin } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      paths: [
        {
          rootPathSuffix: 'src',
        },
        {
          rootPathPrefix: '@src/',
          rootPathSuffix: 'src/',
        },
        {
          rootPathPrefix: '@components/',
          rootPathSuffix: 'src/components/',
        },
        {
          rootPathPrefix: '@providers/',
          rootPathSuffix: 'src/providers/',
        },
        {
          rootPathPrefix: '@images/',
          rootPathSuffix: 'src/assets/images/',
        },
      ],
    },
  ])
);