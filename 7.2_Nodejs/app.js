const Koa = require("koa");
const config = require("./config");
const co = require("co");
const render = require('koa-swig')
const serve = require('koa-static')
const errorHandler = require('./middlewares/errorHandler')
const { historyApiFallback } = require('koa2-connect-history-api-fallback');

const { port, viewDir, memeoryFlag, staticDir } = config;
const app = new Koa();

app.use(serve(staticDir))
app.context.render = co.wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: memeoryFlag,
    ext: "html",
    varControls:['[[',']]'],
    writeBody:false
  })
);

// app.use(historyApiFallback({ index:'/',whiteList: ['/api'] }));  //要写在路由之前,把正常请求导向js

errorHandler.error(app) //容错

require("./controllers")(app);

app.listen(port, () => {
  console.log("服务启动成功", port);
});
