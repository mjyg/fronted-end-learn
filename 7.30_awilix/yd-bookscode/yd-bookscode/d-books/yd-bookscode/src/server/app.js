import { addAliases } from 'module-alias';
addAliases({
  '@root': __dirname,
  '@models': __dirname + '/models',
  '@controllers': __dirname + '/controllers',
});
import Koa from 'koa';
import render from 'koa-swig';
import serve from 'koa-static';
import { wrap } from 'co';
import { createContainer, Lifetime } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';
import { configure, getLogger } from 'log4js';
import errorHandler from './middlewares/errorHandler.js';
configure({
  appenders: { cheese: { type: 'file', filename: 'logs/yd.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
});
const logger = getLogger('cheese');
// const { historyApiFallback } = require('koa2-connect-history-api-fallback');
import config from './config';
const { port, viewDir, memoryFlag, staticDir } = config;
const app = new Koa();
//核心最重要的第一步 创建容器
const container = createContainer();
//把全部services交给容器管理
container.loadModules([`${__dirname}/services/*.js`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});
//终极注入
app.use(scopePerRequest(container));
app.use(serve(staticDir));
app.context.render = wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: memoryFlag,
    ext: 'html',
    varControls: ['[[', ']]'],
    writeBody: false,
  })
);
errorHandler.error(app, logger);
// app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));
app.use(loadControllers(`${__dirname}/controllers/*.js`));
app.listen(port, () => {
  console.log('🍺服务启动成功', port);
});
