// import Book from '@models/Book';
import { route, GET } from 'awilix-koa';
import { Readable } from 'stream';
import cheerio from 'cheerio';
@route('/books')
class BooksController {
  constructor({ booksService }) {
    this.booksService = booksService;
  }
  @route('/list')
  @GET()
  async actionIndex(ctx, next) {
    const data = await this.booksService.getData();
    const html = await ctx.render('books/pages/list', {
      data,
    });
    if (ctx.request.header['x-pjax']) {
      console.log('站内切');
      const $ = cheerio.load(html);
      ctx.status = 200;
      ctx.type = 'html';
      $('.pjaxcontent').each(function () {
        ctx.res.write($(this).html());
      });
      $('.lazyload-js').each(function () {
        ctx.res.write(
          `<script class="lazyload-js" src="${$(this).attr('src')}"></script>`
        );
      });
      ctx.res.end();
    } else {
      function createSSRStreamPromise() {
        console.log('落地页');
        return new Promise((resolve, reject) => {
          const htmlStream = new Readable();
          htmlStream.push(html);
          htmlStream.push(null);
          ctx.status = 200;
          ctx.type = 'html';
          htmlStream
            .on('error', (err) => {
              reject(err);
            })
            .pipe(ctx.res);
        });
      }
      await createSSRStreamPromise();
      // ctx.body = html;
    }
  }
  @route('/create')
  @GET()
  async actionCreate(ctx) {
    ctx.body = await ctx.render('books/pages/create');
  }
}
export default BooksController;
