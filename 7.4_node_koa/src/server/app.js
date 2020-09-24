import moduleAlias from "module-alias"; //为常用模块和路径创造别名，方便引用
moduleAlias.addAliases({
  //注册别名
  "@root": __dirname,
  "@models": __dirname + "/models",
  "@controllers": __dirname + "/controllers",
});

import Koa from "koa";
import config from "./config"; //生产环境/开发环境相关配置
import co from "co"; //用co-view包装koa-swig
import render from "koa-swig"; //swig模板引擎, 用swig解析模板
import serve from "koa-static"; //静态资源管理插件，配置静态资源目录
import errorHandler from "../../middlewares/errorHandler"; //错误处理中间件
import log4js from "log4js"; //记录日志
import { createContainer, Lifetime } from "awilix";
import { loadControllers, scopePreRequest } from "awilix-koa";

const { port, viewDir, memeoryFlag, staticDir } = config;
const app = new Koa();

//第一步，创建容器
const container = createContainer();
//第二步，把全部service交给容器管理
container.loadModules([
  `${__dirname}/services/*.js`,
  {
    formatName: "camelCase", //自动把类的名字换成驼峰
    resolverOptions: {
      lifetime: Lifetime.SCOPED, //生命周期
    },
  },
]);
//第三步，终极注入
app.use(scopePreRequest(container)); //在请求之前注入容器

app.use(serve(staticDir));
app.context.render = co.wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: memeoryFlag,
    ext: "html",
    varControls: ["[[", "]]"], //模板语法
    writeBody: false,
  })
);

app.use(loadControllers(`${__dirname}/controllers/*.js`)); //动态注入controller

log4js.configure({
  appenders: { cheese: { type: "file", filename: "./logs/cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } },
});

errorHandler.error(app, log4js.getLogger("cheese")); //容错

app.listen(port, () => {
  console.log("服务启动成功", port);
});

/*
单页面应用程序(SPA)通常使用一个web浏览器可以访问的索引文件，比如index.html，然后，在HTML5 History
API的帮助下（vue-router就是基于History API实现的），借助JavaScript处理应用程序中的导航。当用户单
击刷新按钮或直接通过输入地址的方式访问页面时，会出现找不到页面的问题，因为这两种方式都绕开了History
 API，而我们的请求又找不到后端对应的路由，页面返回404错误。connect-history-api-fallback中间件很
 好的解决了这个问题。具体来说，每当出现符合以下条件的请求时，它将把请求定位到你指定的索引文件(默认为/index.html)。

请求是Get请求
请求的Content-Type类型是text/html类型
不是直接的文件请求，即所请求的路径不包含.(点)字符
不匹配option参数中提供的模式
*/
