import { route, GET } from 'awilix-koa';
@route('/')
class IndexController {
  constructor() {}
  @route('/')
  @GET()
  async actionIndex(ctx, next) {
    ctx.body = '京程一灯🏮';
    // ctx.body = await ctx.render('index', {
    //   data: '京程一灯',
    // });
  }
}
export default IndexController;
