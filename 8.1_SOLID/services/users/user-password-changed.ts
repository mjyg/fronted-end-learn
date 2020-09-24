import {Event} from '@node-ts/bus-messages'
import {Uuid} from '@node-ts/ddd-types'

export class UserPasswordChanged extends Event{
  static readonly NAME = 'Jie/account/user-register';
  $name=UserPasswordChanged.NAME;
  $version=0
  constructor(readonly userId:Uuid, readonly passwordChangedAt:Date) {
    super();
  }
}