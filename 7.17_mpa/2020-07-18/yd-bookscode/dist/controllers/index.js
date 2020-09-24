"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaSimpleRouter = _interopRequireDefault(require("koa-simple-router"));

var _BooksController = _interopRequireDefault(require("./BooksController"));

var _IndexController = _interopRequireDefault(require("./IndexController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bookController = new _BooksController.default();
const indexController = new _IndexController.default();

var _default = app => {
  app.use((0, _koaSimpleRouter.default)(_ => {
    _.get('/', indexController.actionIndex);

    _.get('/books/list', bookController.actionIndex);

    _.get('/books/create', bookController.actionCreate);
  }));
};

exports.default = _default;