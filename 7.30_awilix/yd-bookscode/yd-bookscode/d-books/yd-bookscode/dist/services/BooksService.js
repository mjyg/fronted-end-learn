"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// import { get } from 'axios';
class BooksService {
  getData() {
    // return get('http://localhost/basic/web/index.php?r=books');
    return Promise.resolve('🐻数据请求成功');
  }

}

var _default = BooksService;
exports.default = _default;