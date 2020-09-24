// 开启尾递归调用优化
// 元编程：拦截并定义基本语言操作的自定义行为
// let handler = {
//   get: function (target, name) {
//     return name in target ? target[name] : 42;
//   },
//   set: function (target, name) {
//     target[name] = 30;
//     // Reflect.set()
//   },
// };

// let p = new Proxy({}, handler);
// p.a = 1;
// console.log(p.a, p.b); // 1, 42

// var yideng = {
//   [Symbol.toPrimitive]: ((i) => () => ++i)(0),  //原始值
// };
// if (yideng == 1 && yideng == 2 && yideng == 3) {
//   console.log("aaaaa");
// }



const negativeArray = (els) =>
  new Proxy(els, {
    get: (target, propKey, receiver) =>
      Reflect.get(
        target,
        +propKey < 0 ? String(target.length + +propKey) : propKey,
        receiver
      ),
  });
const unicorn = negativeArray(["京", "程", "一", "灯"]);
console.log(unicorn[-1]);


