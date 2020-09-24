const Koa = require("koa");

const app = new Koa();

app.use((ctx) => {
  ctx.body = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>React SSR</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="bundle.js"></script>
    </body>
  </html>`;
});

app.listen(3000,()=>{
  console.log('start success')
})
