"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awilixKoa = require("awilix-koa");

var _stream = require("stream");

var _cheerio = _interopRequireDefault(require("cheerio"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let BooksController = (_dec = (0, _awilixKoa.route)('/books'), _dec2 = (0, _awilixKoa.route)('/list'), _dec3 = (0, _awilixKoa.GET)(), _dec4 = (0, _awilixKoa.route)('/create'), _dec5 = (0, _awilixKoa.GET)(), _dec(_class = (_class2 = class BooksController {
  constructor({
    booksService
  }) {
    this.booksService = booksService;
  }

  async actionIndex(ctx, next) {
    const data = await this.booksService.getData();
    const html = await ctx.render('books/pages/list', {
      data
    });

    if (ctx.request.header['x-pjax']) {
      console.log('站内切');

      const $ = _cheerio.default.load(html);

      ctx.status = 200;
      ctx.type = 'html';
      $('.pjaxcontent').each(function () {
        ctx.res.write($(this).html());
      });
      $('.lazyload-js').each(function () {
        ctx.res.write(`<script class="lazyload-js" src="${$(this).attr('src')}"></script>`);
      });
      ctx.res.end();
    } else {
      function createSSRStreamPromise() {
        console.log('落地页');
        return new Promise((resolve, reject) => {
          const htmlStream = new _stream.Readable();
          htmlStream.push(html);
          htmlStream.push(null);
          ctx.status = 200;
          ctx.type = 'html';
          htmlStream.on('error', err => {
            reject(err);
          }).pipe(ctx.res);
        });
      }

      await createSSRStreamPromise(); // ctx.body = html;
    }
  }

  async actionCreate(ctx) {
    ctx.body = await ctx.render('books/pages/create');
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "actionIndex", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "actionIndex"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "actionCreate", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "actionCreate"), _class2.prototype)), _class2)) || _class);
var _default = BooksController;
exports.default = _default;