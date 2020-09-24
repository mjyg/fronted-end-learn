(function () {
  var root =
    (typeof self == "object" && self.self === self && self) ||
    (typeof global == "object" && global.global === global && global) ||
    Function("return this")() ||
    {};

  var ArrayProto = Array.prototype;
  var push = ArrayProto.push;

  function _(obj) {
    if (!(this instanceof _)) return new _(obj);
    //初始化构造函数
    this._wrapped = obj;
  }

  function map(obj, iteratee) {
    if(isFunction(iteratee)) {
      console.log('第一个参数', obj)
      console.log('第二个参数', iteratee)
    } else {
      throw new Error('err')
    }
  }

  function throttle(fn, wait=500){
    let timer;
    return function(...args){
      if(timer == null){
        setTimeout(()=>{
         timer = null
        }, wait)
        return fn.apply(this, args)
      }
    }
  }


  function each(obj, callback) {
    if (Array.isArray(obj)) {
      for (let item of obj) {
        callback && callback.call(_, item);
      }
    }
  }

  function isFunction(obj){
    return typeof obj == 'function' || false;
  }

  function functions(obj){
    var names = []
    for(var key in obj){
      if(isFunction(obj[key])){
        names.push(key)  //函数数组
      }
    }
    return names
  }

  var allExports = {
    map,
    throttle
  };

  // Add your own custom functions to the Underscore object.
  function mixin(obj) {
    each(functions(obj), function (name) {
      console.log('name', name);
      var func = (_[name] = obj[name]);
      _.prototype[name] = function () {
        //把方法挂到原型链上
        var args = [this._wrapped]; //['京城一灯']
        push.apply(args, arguments); //['京城一灯',回调函数]
        console.log("合并之后的args", arguments);
        return func.apply(_, args)
      };
    });
  }

  mixin(allExports);

  root._ = root;
})();
