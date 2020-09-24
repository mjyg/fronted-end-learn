const argv = require("yargs-parser")(process.argv.slice(2)); //拿到执行命令参数
const _mode = argv.mode || "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const { merge } = require("webpack-merge"); //合并webpack对象
const { sync } = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlAfterPlugin = require("./config/HtmlAfterPlugin"); //跟html插件有关系，写在html插件下面,生成html模板后执行
const { resolve } = require("path");

const _entry = {};
let _plugins = [];

//找xxx.entry.js
const files = sync("./src/web/views/**/*.entry.js");

for(let)
for (let item of files) {
  console.log(item); //  \src\web\views\books\books-create.entry.json
  if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry.js)/g.test(item) === true) {
    const entryKey = RegExp.$1; // book-create
    _entry[entryKey] = item;
    const [dist, template] = entryKey.split("-");
    _plugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${dist}/pages/${template}.html`,
        template: `src/web/views/${dist}/pages/${template}.html`,
        chunks: ["runtime", entryKey], //只引用公用代码和自己的js
        inject: false,
      })
    );
  } else {
    console.log("项目配置匹配失败");
    process.exit(-1); //退出
  }
}

const webpackConfig = {
  entry: _entry,
  rules:[
    {
      test:/\.css$/i,
      use:[]
    }
  ],
  optimization: {
    //抽取webpack公用代码
    runtimeChunk: {
      name: "runtime",
    },
  },
  plugins: [..._plugins, new HtmlAfterPlugin()],
  resolve: {
    alias: {
      //处理js
      "@": resolve("src/web"),
    },
  },
};
module.exports = merge(webpackConfig, _mergeConfig);
