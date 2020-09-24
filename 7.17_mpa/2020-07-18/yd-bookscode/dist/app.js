"use strict";

var _moduleAlias = require("module-alias");

var _koa = _interopRequireDefault(require("koa"));

var _koaSwig = _interopRequireDefault(require("koa-swig"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _co = require("co");

var _log4js = require("log4js");

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler.js"));

var _config = _interopRequireDefault(require("./config"));

var _controllers = _interopRequireDefault(require("./controllers"));

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
const app = new _koa.default();
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


(0, _controllers.default)(app);
app.listen(port, () => {
  console.log('🍺服务启动成功', port);
});