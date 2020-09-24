// interface IContainer {
//     callback: void
// }
class CreateIoc {
    public container: Map<Symbol, { callback: Function }>;
    constructor() {
        this.container = new Map();
    }
    get(namspace: Symbol) {
        let item = this.container.get(namspace);
        if (item) {
            return item.callback();
        } else {
            throw new Error("😭namspace 并未找到")
        }
    }
    bind(key: Symbol, callback: Function) {
        this.container.set(key, {
            callback
        })
    }
}
export default CreateIoc;

// callback:{}

// class Ioc {
//     public container = new Map();
//     fake() { }
//     restore() { }
//     bind() { }
//     singleleton() { }
//     use(namspace) {
//         //new + 单例
//     }
// }