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
import controllers from './controllers';
const app = new Koa();
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
controllers(app);
app.listen(port, () => {
  console.log('🍺服务启动成功', port);
});
