//打包NOdeJS代码
const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "development",
  target: "node",  //表示打包的是node环境
  externals: [nodeExternals()], //避免打包node api
  entry: path.join(__dirname, "../src/server/app.tsx"),
  output: {
    filename: "app.js",
    path: path.join(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
};
