import {AggregateRoot} from '@node-ts/ddd'  //聚合根
import {AggregateRootProperties, Uuid} from '@node-ts/ddd-types'
import {UserRegistered} from "./users";
import TAGS from "../constant/tags";
import {provide} from 'inversify-binding-decorators'

interface UserProperties extends AggregateRootProperties{
  passwordChangedAt:Date | undefined,
  isEnable: boolean,
  email:string,
}

@provide(TAGS.UserService)
export class UserService extends AggregateRoot implements UserProperties{
  passwordChangedAt:Date | undefined;
  isEnable: boolean;
  email:string;
  static register(id:Uuid, email:string) {
    const uerRegistered = new UserRegistered(id,email,true)
    const user = new UserService(id)
    user.when(uerRegistered)  //加生命周期
    return user
  }
   protected  whenUserRegistered(event: UserRegistered) {
    this.email = event.email;
    this.isEnable = event.isEnabled;
   }

}