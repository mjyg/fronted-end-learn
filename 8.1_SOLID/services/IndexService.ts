import { IIndex } from "../interface/IIndex";
import { Model } from "../models/User";
import {provide} from 'inversify-binding-decorators'
import TAGS from "../constant/tags";

@provide(TAGS.IndexService)  //2.实现接口，装饰器标记可被注入,TAG用来标记名字
export class IndexService implements IIndex {
  private userStorage: Model.User[] = [
    {
      email: "23434345322@qq.com",
      name: "jie",
    },
    {
      email: "234341111@qq.com",
      name: "jie2",
    },
  ];
  public getUser(id: number): Model.User {
      let result:Model.User;
      result = this.userStorage[id];
      return result
  }
}
