1.写接口 SOLID 开发原则
2.zhijia.ts 实现接口 service 可被注入 @可被注入 3.起名字
容器.绑定<interface 类>（名字）（具体是哪个类）
container.bind<Warrior>(TYPES.Warrior).to(Ninja); 4.执行注入到需要的类里

🐻.基于 SOLID 的 inversify 框架完成 IOC 的 Node.js 小架构
├── README.md 文档
├── app.ts 启动文件
├── constant 敞亮定义
├── controllers 路由文件
├── interface 接口
├── ioc 控制中心
├── models 数据模型
├── node_modules 仓库 @types/xxx
├── package.json 包管理
├── services 服务层实现接口层
├── tsconfig.json 配置文件最好一个个往里填
└── yarn.lock 🔐 包锁文件
