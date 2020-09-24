import {
    Student,
    Teacher,
    Classroom
} from "./interfaces";
import TYPES from "./types";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
class Xiaoming implements Student {
    public learn() {
        return "✊努力学习";
    }
}

@injectable()
class Zhijia implements Teacher {
    public teaching() {
        return "教高级前端🌶 --》";
    }
}

@injectable()
class Yd implements Classroom {
    private _xiaoming: Student;
    private _zhijia: Teacher;
    constructor(@inject(TYPES.Student) xiaoming, @inject(TYPES.Teacher) zhijia) {
        this._xiaoming = xiaoming;
        this._zhijia = zhijia;
    }
    // @inject(TYPES.Student)  private  _xiaoming:Student;
    // @inject(TYPES.Teacher)  private  _zhijia:Teacher;
    public study() {
        return this._zhijia.teaching() + this._xiaoming.learn();
    }
}
export {
    Xiaoming,
    Zhijia,
    Yd
}