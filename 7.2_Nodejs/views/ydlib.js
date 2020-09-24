(function () {
  var root =
    (typeof self == "object" && self.self === self && self) ||
    (typeof global == "object" && global.global === global && global) ||
    Function("return this")() ||
    {};
  function _(obj) {}

  // The Underscore object. All exported functions below are added to it in the
  // modules/index-all.js using the mixin function.
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
      throw new Error()
    }
  }

  var allExports = {
    map,
  };
  var ArrayProto = Array.prototype;
  var push = ArrayProto.push;

  function each(obj, callback) {
    if (Array.isArray(obj)) {
      for (let item of obj) {
        callback && callback.call(_, item);
      }
    }
  }

  function isFunction(){
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

  // Add your own custom functions to the Underscore object.
  function mixin(obj) {
    each(functions(obj), function (name) {
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

  mixin(_);

  root._ = root;
})();
