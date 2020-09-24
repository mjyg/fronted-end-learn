"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = require("axios");

class Books {
  getData() {
    return (0, _axios.get)('http://localhost/basic/web/index.php?r=books');
  }

}

var _default = Books;
exports.default = _default;