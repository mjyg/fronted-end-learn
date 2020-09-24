import { Event } from "@node-ts/bus-messages";
import { Uuid } from "@node-ts/ddd-types";
export class UserPasswordChangged extends Event {
    static readonly NAME = "yideng/accout/user-password-changged";
    $name = UserPasswordChangged.NAME;
    $version = 0;
    constructor(readonly userId: Uuid, readonly passwordChangedAt: Date) {
        super();
    }
}