const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  output: {
    path: join(__dirname, '../dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].bundle.js',
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
          transformPath(targetPath, absolutePath) {
            return targetPath.replace('src/web/components/', '');
          },
        },
      ],
    }),
  ],
};
