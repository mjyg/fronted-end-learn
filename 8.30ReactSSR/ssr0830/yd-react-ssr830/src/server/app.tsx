import Koa from "koa";
import Router from "@koa/router";
import serve from "koa-static";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../shared/App";
import { StaticRouter } from "react-router-dom";
import { matchPath } from "react-router-dom";
import routes from "../shared/Routes";
import { Provider } from "react-redux";
import { createServerStore } from "../shared/store";

const app = new Koa();
const router = new Router();

router.get(["/", "/about"], async (ctx, next) => {
  const promises = [];
  const store = createServerStore()

  routes.some((route) => {
    const match = matchPath(ctx.request.path, route);
    if (match && route.loadData) promises.push(route.loadData(store));
    return match;
  });

  await Promise.all(promises).then((data) => {
    const html = renderToString(
      <Provider store={store}>
      <StaticRouter location={ctx.req.url}>
        <App />
      </StaticRouter>
      </Provider>
    );

    ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React SSR</title>
    </head>
    <body>
        <script>window.REDUX_STORE = ${JSON.stringify(store.getState())}</script>
        <div id="root">${html}</div>
        <script src="bundle.js"></script>
    </body>
    </html>
    `;
  });
});

router.get("/getData", (ctx) => {
  ctx.body = {
    code: 0,
    message: "",
    data: "后端返回的数据",
  };
});

app.use(serve("public"));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
