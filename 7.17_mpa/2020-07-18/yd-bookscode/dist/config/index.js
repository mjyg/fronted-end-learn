"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _path = require("path");

let config = {
  viewDir: (0, _path.join)(__dirname, '..', 'views'),
  staticDir: (0, _path.join)(__dirname, '..', 'assets')
};

if (process.env.NODE_ENV === 'development') {
  let localConfig = {
    port: 8081,
    memoryFlag: false
  };
  config = (0, _lodash.extend)(config, localConfig);
}

if (process.env.NODE_ENV === 'production') {
  let prodConfig = {
    port: 8082,
    memoryFlag: 'memory'
  };
  config = (0, _lodash.extend)(config, prodConfig);
}

var _default = config;
exports.default = _default;