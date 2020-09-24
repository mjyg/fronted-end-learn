module.exports = {
  output:{
    assetModuleFilename:'images/[name].[hash:5][ext]'//配置静态资源位置
  },
  module:{
    rules:[
      {
        test:/\.(png|jpg|svg)$/i,
        type:'asset',
      },
      {
        test:/\.css$/i,
        use:['style-loader', 'css-loader']
      }
    ]
  },
  // cache:{
  //   type:'filesystem',
  // },
  // resolve:{
  //   alias:{
  //     crypto:false //去掉polifyll
  //   }
  // },
  optimization:{
    // chunksIds:"deterministic",
    // moduleIds:"deterministic",
  //   splitChunks:{
  //     cacheGroups:{
  //       commons:{
  //         chunks:'all',
  //         name:'commons',
  //       }
  //     },
  //     minSize:{//js,css最大最小尺寸(webpack5新增限制css尺寸)
  //       javascript:0,
  //       style:0
  //     },
  //     maxSize:{
  //       javascript:1,
  //       style:20000, //30kb
  //     },
  //   },
  },
  experiments:{
    topLevelAwait:true,  //支持单独写await
    asset:true //支持图片
  }
}