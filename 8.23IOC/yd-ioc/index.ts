import CreateIoc from "./ioc";
import "reflect-metadata";
import { parseScript } from "esprima";
import { Pattern } from "estree";

const container = new CreateIoc();

//基本的类型的定义
interface ITypes {
    [key: string]: Symbol
}
const Types: ITypes = {
    indexService: Symbol.for("indexService")
}
interface IIndexService {
    log(str: string): void;
}
class IndexService implements IIndexService {
    public log(str: string) {
        console.log(str);
    }
}
//注入到容器
container.bind(Types.indexService, () => new IndexService());
function getParams(fn: Function) {
    let ast = parseScript(fn.toString());
    let funParams: Pattern[] = [];
    let node = ast.body[0];
    if (node.type === "FunctionDeclaration") {
        funParams = node.params;
    }
    let validParams: string[] = [];
    funParams.forEach((obj) => {
        if (obj.type === "Identifier") {
            validParams.push(obj.name);
        }
    })
    // console.log("生成的ast的节点", validParams);
    return validParams;
}
function hasKey<O extends Object>(obj: O, key: keyof any): key is keyof O {
    return obj.hasOwnProperty(key);
}
function controller<T extends { new(...args: any[]): {} }>(constructor: T) {
    // constructor.prototype.indexService = new IndexService();
    // constructor.prototype.indexService = container.get(Types.indexService);
    class Controller extends constructor {
        constructor(...args: any[]) {
            super(args);
            const _fnParams = getParams(constructor);
            let identity: string;
            for (identity of _fnParams) {
                if (hasKey(this, identity)) {
                    // this[identity] = container.get(Types[identity]);
                    this[identity] = Reflect.getMetadata(Types[identity], constructor)
                    // console.log("🐯", identity)
                } else {
                    throw new Error(identity);
                }
            }
        }
        // [index: string]: any;
    }
    return Controller;
}
function inject(serviceIdentifier: Symbol): Function {
    return (target: Function, targetKey: string, index: number) => {
        // console.log(target, targetKey, index);
        if (!targetKey) {
            Reflect.defineMetadata(serviceIdentifier, container.get(serviceIdentifier), target)
        }
    }
}
@controller
class IndexController {
    public indexService: IIndexService;
    constructor(@inject(Types.indexService) indexService: any) {
        this.indexService = indexService;
    }
    // test(@inject(Types.indexService) a1: any, @inject(Types.indexService) a2: any) {

    // }
    info() {
        this.indexService.log("🍊注入成功" + Math.random());
    }
}

//①所有的类全部聚齐到一块
//this.indexService = new IndexService();

//② 自己让服务类和具体的路由分离开来
// const instance = new IndexService();
// new IndexController(instance)

//③自己自行注入
const index = new IndexController(null);
// console.log(index.indexService.log("Xxxx"));
index.info();