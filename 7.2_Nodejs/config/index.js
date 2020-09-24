const lodash = require("lodash");
const { join } = require("path");

const { extend } = lodash;

let config = {
  viewDir: join(__dirname, "..", "views"),
  staticDir: join(__dirname, "..", "assets"),
};
if (process.env.NODE_ENV === "development") {
  let localConfig = {
    port: 8081,
    memeoryFlag: false,
  };
  config = extend(config, localConfig);
}
if (process.env.NODE_ENV === "production") {
  let proConfig = {
    port: 80,
    memeoryFlag: false,
  };
  config = extend(config, proConfig);
}

module.exports = config;
