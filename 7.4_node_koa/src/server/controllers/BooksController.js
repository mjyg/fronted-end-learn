import Book from "@models/Book";
import { route, GET } from "awilix-koa"; //引入路由
import { Readable } from "stream";
import cheerio from "cheerio"; //一块一块加载html

@route("/books") //使用装饰器定义路由
class BooksCrotroller {
  contructor({ booksService }) {
    //不需要引入bookService，可以直接使用
    this.booksService = booksService;
  }

  @route("/list") //定义路由
  @GET() //支持get请求
  async actionIndex(ctx, next) {
    const data = await this.bookService.getData();
    const html = await ctx.render("books/pages/list", {
      data,
    });

    //mpa切换spa
    //通过请求头判断是否是站内切还是刷新进来，站内加载部分html，刷新加载全部html
    if (ctx.request.header["x-pjax"]) {
      console.log("站内切");

      ctx.status = 200; //修状态
      ctx.type = "html";
      const $ = cheerio.load(html); //一块一块加载html
      //找到list组件
      $(".pjaxcontent").each(function () {
        ctx.res.write($(this).html); //输出list组件的html
      });

      //拼这块dom需要的js
      $(".lazyload-js").each(function () {
        ctx.res.write(`<script class='lazyload-js' src='${this.attr("src")}`);
      });

      ctx.res.end();
    } else {
      function createSSRStreamPromise() {
        return new Promise((resolve, reject) => {
          console.log("落地页");
          const htmlStrame = new Readable();
          htmlStrame.push(html); //用流读取html
          htmlStrame.push(null);
          ctx.status = 200; //修状态
          ctx.type = "html";
          htmlStrame
            .on("error", (err) => {
              reject(err);
            })
            .pipe(ctx.res); //基于流式输出html
        });
      }
      await createSSRStreamPromise();
    }
  }

  @route("/create")
  @GET()
  async actionCreate(ctx, next) {
    const book = new Book();
    const data = [
      { name: "aa", price: 99 },
      { name: "bb", price: 44 },
    ];
    ctx.body = await ctx.render("books/pages/create");
  }
}

export default BooksCrotroller;
