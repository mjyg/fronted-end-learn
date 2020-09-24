"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Controller = _interopRequireDefault(require("./Controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IndexController extends _Controller.default {
  constructor() {
    super();
  }

  async actionIndex(ctx, next) {
    ctx.body = '京程一灯🏮'; // ctx.body = await ctx.render('index', {
    //   data: '京程一灯',
    // });
  }

}

var _default = IndexController;
exports.default = _default;