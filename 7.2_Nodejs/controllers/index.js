const router = require("koa-simple-router");
const ApiController = require("./ApiController");
const IndexController = require("./IndexController");

const apiController = new ApiController();
const indexController = new IndexController();

module.exports = (app) => {
  app.use(
    router((_) => { //路由
      _.get("/", indexController.actionIndex);
      _.get("/api/list", apiController.actionIndex);
      _.get("/api/create", apiController.actionCreate);
    }
  ));
};
