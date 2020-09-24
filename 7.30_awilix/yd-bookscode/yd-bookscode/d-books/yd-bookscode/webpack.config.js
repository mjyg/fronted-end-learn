const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const { merge } = require('webpack-merge');
const { sync } = require('glob');
const { resolve } = require('path');
const files = sync('./src/web/views/**/*.entry.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlAfterPlugin = require('./config/HtmlAfterPlugin');

let _entry = {};
let _plugins = [];
for (let item of files) {
  // console.log(item)
  if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js)/g.test(item) == true) {
    console.log(RegExp.$1);
    const entryKey = RegExp.$1;
    _entry[entryKey] = item;
    const [dist, template] = entryKey.split('-');
    _plugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${dist}/pages/${template}.html`,
        template: `src/web/views/${dist}/pages/${template}.html`,
        chunks: ['runtime', entryKey],
        inject: false,
      })
    );
  } else {
    console.log('🐖', '项目配置匹配失败');
    process.exit(-1);
  }
}
const webpackConfig = {
  entry: _entry,
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [..._plugins, new HtmlAfterPlugin()],
  resolve: {
    alias: {
      '@': resolve('src/web'),
    },
  },
};
module.exports = merge(webpackConfig, _mergeConfig);
