import { route, GET } from "awilix-koa"; //引入路由

// @route("/index/html") //伪静态路由
@route("/")
class IndexController {
  contructor() {}

  @route("/")
  @GET()
  async actionIndex(ctx, next) {
    ctx.body = "京城一灯";
  }
}

export default IndexController;
