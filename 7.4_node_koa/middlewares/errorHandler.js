class errorHandlers {
  static error(app, logger) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        logger.error(e) //500错误记录日志
        ctx.body = "500 error";
      }
    });

    app.use(async (ctx, next) => {
      await next();
      //回来错误兜底(洋葱模型)
      if (404 !== ctx.status) {
        return;
      }
      // ctx.status = 200 //404里body塞了东西就不需要手动设置200
      ctx.body =
        '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
    });
  }
}
module.exports = errorHandlers;
