const path = require("path");

//webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')  //自动生成html模板
const {CleanWebpackPlugin} = require('clean-webpack-plugin')  //自动清除dist目录

//webpack基于commonjs开发的
module.exports = {
  mode: "production",
  //入口文件，多入口
  entry: {
    main: "./src/index.js",
    buddle: './src/demo.js'
  },
  //打包目录
  output: {
    filename: "[name].[hash:5].js", //用占位符，打包后的文件名字
    path: path.resolve(__dirname + "/dist"), //打包后的文件路径，写绝对路径
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/, //指定检测什么文件
        use: {
          loader: "url-loader", //文件预处理器
          options: {
            name: "[name].[hash:5].[ext]", //修改打包后的文件名,五位哈希值。当文件有修改时使用新哈希值，防止页面缓存图片不更新
            outputPath: "assets/", //打包目录，dist目录下
            limit:300*1024 //图片小于250kb打包成base64
          },
        },
      },
      {
        test: /\.ttf$/,
        use: {
          loader: "file-loader",
        },
      },
      {
        test: /\.(less|css)$/,
        // use:["style-loader","css-loader","less-loader"] //执行顺序，从右到左
        use: [  //执行顺序，从下到上
          {
            loader: "style-loader",  //通过style标签将css直接注入html页面
          },
          {
            loader: "css-loader",  //将css转成CommonJS
          },
          {
            loader: "postcss-loader",  //自动加上css前缀，兼容不同浏览器
          },
          {
            loader: "less-loader", //将less转成css
          },
        ],
      },
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: "./src/index.html" //指定模板位置
    }),
    new CleanWebpackPlugin()
  ]
};
