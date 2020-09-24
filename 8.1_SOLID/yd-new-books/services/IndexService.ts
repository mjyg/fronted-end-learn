import { IIndex } from "../interface/IIndex";
import { Model } from "../models/User";
import { provide } from "inversify-binding-decorators";
import TAGS from "../constant/tags";
@provide(TAGS.IndexService)
export class IndexService implements IIndex {
    private userStorage: Model.User[] = [{
        email: "495725428@qq.com",
        name: "老袁"
    }, {
        email: "wangning@yidengxuetang.com",
        name: "老王"
    }]
    public getUser(id: number): Model.User {
        let result: Model.User;
        result = this.userStorage[id];
        return result;
    }
}