const HtmlWebpackPlugin = require('html-webpack-plugin');
const pluginName = 'HtmlAfterPlugin';

const assetsHelp = (data) => {
  let js = [];
  const getAssetsName = {
    js: (item) => `<script src="${item}"></script>`,
  };
  for (let jsitem of data.js) {
    js.push(getAssetsName.js(jsitem));
  }
  return {
    js,
  };
};

class HtmlAfterPlugin {
  constructor() {
    this.jsarr = [];
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName,
        (htmlPligunData, cb) => {
          const { js } = assetsHelp(htmlPligunData.assets);
          this.jsarr = js;
          cb(null, htmlPligunData);
        }
      );
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName,
        (data, cb) => {
          let _html = data.html;
          _html = _html.replace('<!--injectjs-->', this.jsarr.join(''));
          _html = _html.replace(/@components/g, '../../../components');
          _html = _html.replace(/@layouts/g, '../../layouts');
          data.html = _html;
          cb(null, data);
        }
      );
    });
  }
}

module.exports = HtmlAfterPlugin;
