import container from "./inversify.config";
import TYPES from "./types";
import { Classroom } from "./interfaces";

const classroom = container.get<Classroom>(TYPES.Classroom);
console.log(classroom.study());