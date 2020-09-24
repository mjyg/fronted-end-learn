// module federation  暴露想暴露的包
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

// @type{import('webpack').Configuration)}
module.exports = {
  mode: "development",
  output:{
    publicPath:'http://localhost:3002/'  //输出到3002端口目录下，否则app1找不到
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      library: { type: "var", name: "app2" }, //变量的形式打包到app2上
      exposes: {
        "./Button": "./src/Button", //导出去的组件
      },
      filename: "remoteEntry.js", //代理app2,挂载暴露出去的组件
      //share的包
      // shared: ["react", "react-dom"],
      shared: {
        react: {
          singleton: true,
          eager: true,
        },
        'react-dom': {
          singleton: true,
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
