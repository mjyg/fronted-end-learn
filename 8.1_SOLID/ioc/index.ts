import {fluentProvide} from 'inversify-binding-decorators'

//流式provide
let provideThrowable = (identifier: symbol, name:string)=>{
  return fluentProvide(identifier).whenTargetNamed(name).done()
}

export {provideThrowable}