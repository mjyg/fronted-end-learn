🐻 京程一灯 🏮BFF 脚手架初探
├── README.md #帮助项目开发文件
├── app.js #项目启动文件通过
├── assets
├── bin
├── config
├── controllers
├── libs
├── logs
├── middlewares
├── models
├── node_modules
├── npm-debug.log
├── package-lock.json
├── package.json
├── tests
├── views
└── widgets

12 directories, 5 files

node.js

books/list
-> html(vue/react/html/js) js 代码 res.end("<html/>")
① 能看见这个页面
② 能看见还得快

-> 选择
① 后台模板 + 前端模板
增强 灌入 html + html 的操作 虚拟 dom
② js 合二为一 同构

->mpa 的多页应用 webpack
① node.js + 后台模板 + html
② pages/books/list.html <-继承自 layout.html
③ 去找页面需要哪些组件？banner 组件
{% include "./components/banner/banner.html" %}
④ 关键一步 banner.js + banner.css 带过来 koa

⑤chunk js 相互依赖

books/list -> list.html -> banner.html -> banne.css+banner.js

list.html -> list.entry.js + banner.js ->list.js
