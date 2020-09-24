const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const minify = require('html-minifier').minify;
module.exports = {
  output: {
    path: join(__dirname, '../dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].[contenthash:5].bundle.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: join(__dirname, '../', 'src/web/views/layouts/layout.html'),
          to: '../views/layouts/layout.html',
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/web/components/**/*.html',
          to: '../components',
          transform(content, absoluteFrom) {
            const resutlt = minify(content.toString('utf-8'), {
              collapseWhitespace: true,
            });
            return resutlt;
          },
          transformPath(targetPath, absolutePath) {
            return targetPath.replace('src/web/components/', '');
          },
        },
      ],
    }),
  ],
};
