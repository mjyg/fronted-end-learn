import { fluentProvide } from "inversify-binding-decorators";

let provideThrowable = (identifier: symbol, name: string) => {
    return fluentProvide(identifier).whenTargetNamed(name).done();
}

export {
    provideThrowable
}