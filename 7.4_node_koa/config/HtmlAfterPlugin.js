//处理html的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pluginName = "HtmlAfterPlugin";

const assetsHelp = (data) => {
  let js = [];
  const getAssetsName = {
    js: (item) => `<script class='lazyload-js' src="${item}"></script>`,
  };
  for (let jsitem of data.js) {
    // console.log("11111", data.js);
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
        (htmlPluginData, cb) => {
          const { js } = assetsHelp(htmlPluginData.assets);
          this.jsarr = js;
          cb(null, htmlPluginData);
        }
      );
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName,
        (data, cb) => {
          let _html = data.html; //取出html
          _html = _html.replace("<!--injectjs-->", this.jsarr.join("")); //替换<!--injectjs-->
          _html = _html.replace("@/components/g", "../../../components"); //全局替换components
          _html = _html.replace("@/layouts/g", "../../layouts"); //全局替换layouts
          data.html = _html;
          cb(null, data);
        }
      );
    });
  }
}

module.exports = HtmlAfterPlugin;
