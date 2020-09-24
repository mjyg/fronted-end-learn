import "reflect-metadata";
import "./ioc/loader";
import { Container } from "inversify";
import { InversifyKoaServer } from "inversify-koa-utils";
import {buildProviderModule} from 'inversify-binding-decorators'

const container = new Container(); //创建容器
container.load(buildProviderModule()); //装载头顶标志可被注入的类

let server = new InversifyKoaServer(container);

let app = server.build()
app.listen(3000, ()=>{
  console.log('🍺服务启动成功')
})