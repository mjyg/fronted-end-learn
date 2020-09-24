import {Model} from "../models/User";

// 1.写接口，SOLID开发原则
export interface IIndex {
    getUser(id:number):Model.User
}