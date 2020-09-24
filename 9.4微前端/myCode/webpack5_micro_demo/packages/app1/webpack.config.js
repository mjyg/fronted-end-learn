// module federation  暴露想暴露的包
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

// @type{import('webpack').Configuration)}
module.exports = {
  mode: "development",
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
      name: "app1",
      library: { type: "var", name: "app1" }, //变量的形式打包到app1上
      remotes: { app2: "app2" },  //要的是app2
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
