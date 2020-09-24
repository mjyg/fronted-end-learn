import {Event} from '@node-ts/bus-messages'
import {Uuid} from '@node-ts/ddd-types'

export class UserDisabled extends Event{
  static readonly NAME = 'Jie/account/user-disabled';
  $name=UserDisabled.NAME;
  $version=0
  constructor(readonly userId:Uuid, readonly isEnabled:boolean) {
    super();
  }
}