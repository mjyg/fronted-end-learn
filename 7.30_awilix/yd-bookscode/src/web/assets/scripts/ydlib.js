(function () {
  var root =
    (typeof self == 'object' && self.self === self && self) ||
    (typeof global == 'object' && global.global === global && global) ||
    Function('return this')() ||
    {};
  var ArrayProto = Array.prototype,
    push = ArrayProto.push;
  function _(obj) {
    if (!(this instanceof _)) return new _(obj);
    //初始化的改造函数
    this._wrapped = obj;
  }
  function map(obj, iteratee) {
    if (isFunction(iteratee)) {
      console.log('第一个参数', obj);
      console.log('第二个参数', iteratee);
    } else {
      throw new Error('xxx');
    }
  }
  function throttle(fn, wait = 500) {
    let timer;
    return function (...args) {
      if (timer == null) {
        timer = setTimeout(() => {
          timer = null;
        }, wait);
        return fn.apply(this, args);
      }
    };
  }
  function each(obj, callback) {
    if (Array.isArray(obj)) {
      for (let item of obj) {
        callback && callback.call(_, item);
      }
    }
  }
  function isFunction(obj) {
    return typeof obj == 'function' || false;
  }
  function functions(obj) {
    var names = [];
    for (var key in obj) {
      if (isFunction(obj[key])) {
        names.push(key);
      }
    }
    return names;
  }
  var allExports = {
    map,
    throttle,
  };
  function mixin(obj) {
    each(functions(obj), function (name) {
      console.log('name', name);
      var func = (_[name] = obj[name]);
      _.prototype[name] = function () {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return func.apply(_, args);
      };
    });
  }

  mixin(allExports);
  root._ = _;
})();
