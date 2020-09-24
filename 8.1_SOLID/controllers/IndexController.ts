import { interfaces, controller, httpGet, TYPE } from "inversify-koa-utils";
import { IIndex } from "../interface/IIndex";
import { inject } from "inversify";
import TAGS from "../constant/tags";
import { IRouterContext } from "koa-router";
import { provideThrowable } from "../ioc";
import {UserService} from '../services/UserService'

@provideThrowable(TYPE.Controller, "IndexController") //流式provide，跑到该路由才加载
@controller("/")
export default class IndexController implements interfaces.Controller {
  private indexService: IIndex;
  @inject(TAGS.IndexService) UserService:IIndex
  constructor(@inject(TAGS.IndexService) indexService: IIndex) {  //依赖注入（构造注入）
    this.indexService = indexService;
  }
  @httpGet("/")
  private async index(
    ctx: IRouterContext,
    next: () => Promise<unknown>
  ): Promise<void> {
    const data = this.indexService.getUser(1);
    const user_service = UserService.register('122', '22222@qq.com')
    console.log(user_service)
    ctx.body = {
      data,
    };
  }
}
