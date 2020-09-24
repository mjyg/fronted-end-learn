"use strict";

var _moduleAlias = require("module-alias");

var _koa = _interopRequireDefault(require("koa"));

var _koaSwig = _interopRequireDefault(require("koa-swig"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _co = require("co");

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

var _log4js = require("log4js");

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler.js"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _moduleAlias.addAliases)({
  '@root': __dirname,
  '@models': __dirname + '/models',
  '@controllers': __dirname + '/controllers'
});
(0, _log4js.configure)({
  appenders: {
    cheese: {
      type: 'file',
      filename: 'logs/yd.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});
const logger = (0, _log4js.getLogger)('cheese'); // const { historyApiFallback } = require('koa2-connect-history-api-fallback');

const {
  port,
  viewDir,
  memoryFlag,
  staticDir
} = _config.default;
const app = new _koa.default(); //核心最重要的第一步 创建容器

const container = (0, _awilix.createContainer)(); //把全部services交给容器管理

container.loadModules([`${__dirname}/services/*.js`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: _awilix.Lifetime.SCOPED
  }
}); //终极注入

app.use((0, _awilixKoa.scopePerRequest)(container));
app.use((0, _koaStatic.default)(staticDir));
app.context.render = (0, _co.wrap)((0, _koaSwig.default)({
  root: viewDir,
  autoescape: true,
  cache: memoryFlag,
  ext: 'html',
  varControls: ['[[', ']]'],
  writeBody: false
}));

_errorHandler.default.error(app, logger); // app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));


app.use((0, _awilixKoa.loadControllers)(`${__dirname}/controllers/*.js`));
app.listen(port, () => {
  console.log('🍺服务启动成功', port);
});