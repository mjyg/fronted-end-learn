import { Container } from "inversify";
import TYPES from "./types";
import {
    Student,
    Teacher,
    Classroom
} from "./interfaces";
import {
    Xiaoming,
    Zhijia,
    Yd
} from "./entities";

const container = new Container();
container.bind<Student>(TYPES.Student).to(Xiaoming);
container.bind<Teacher>(TYPES.Teacher).to(Zhijia);
container.bind<Classroom>(TYPES.Classroom).to(Yd);

export default container;