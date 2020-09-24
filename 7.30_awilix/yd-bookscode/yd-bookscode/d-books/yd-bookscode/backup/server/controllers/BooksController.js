import Controller from './Controller';
class ApiController extends Controller {
  constructor() {
    super();
  }
  async actionIndex(ctx, next) {
    // const book = new Book();
    // const { data } = await book.getData();
    const data = '123';
    // console.log('🐻', data);
    // ctx.body = {
    //   data,
    // };
    ctx.body = await ctx.render('books/pages/list');
  }
  async actionCreate(ctx) {
    ctx.body = await ctx.render('books/pages/create');
  }
}
export default ApiController;
