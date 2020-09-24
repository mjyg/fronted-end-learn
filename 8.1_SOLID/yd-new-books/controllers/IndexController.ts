import { interfaces, controller, httpGet, TYPE } from "inversify-koa-utils";
import { IIndex } from "../interface/IIndex";
import { inject } from "inversify";
import TAGS from "../constant/tags";
import { IRouterContext } from "koa-router"
import { provideThrowable } from "../ioc";
import { UserService } from "../services/UserService";
@provideThrowable(TYPE.Controller, "IndexController")
@controller("/")
export default class IndexController implements interfaces.Controller {
    private indexService: IIndex;
    // @inject(TAGS.IndexService) userService: UserProperties
    constructor(@inject(TAGS.IndexService) indexService: IIndex) {
        this.indexService = indexService;
    }
    @httpGet("/")
    private async index(ctx: IRouterContext, next: () => Promise<unknown>): Promise<void> {
        const data = this.indexService.getUser(0);
        const user_service = UserService.register("123345", "495725428@qq.com");
        console.log(user_service);
        ctx.body = {
            data
        }
    }
}