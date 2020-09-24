import Controller from './Controller';
class IndexController extends Controller {
  constructor() {
    super();
  }
  async actionIndex(ctx, next) {
    ctx.body = '京程一灯🏮';
    // ctx.body = await ctx.render('index', {
    //   data: '京程一灯',
    // });
  }
}
export default IndexController;
