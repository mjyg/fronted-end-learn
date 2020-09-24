"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Controller = _interopRequireDefault(require("./Controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApiController extends _Controller.default {
  constructor() {
    super();
  }

  async actionIndex(ctx, next) {
    // const book = new Book();
    // const { data } = await book.getData();
    const data = '123'; // console.log('🐻', data);
    // ctx.body = {
    //   data,
    // };

    ctx.body = await ctx.render('books/pages/list');
  }

  async actionCreate(ctx) {
    ctx.body = await ctx.render('books/pages/create');
  }

}

var _default = ApiController;
exports.default = _default;